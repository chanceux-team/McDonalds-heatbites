import { PrismaClient } from '@prisma/client';
import type { Post } from '@mattermost/types/posts';
import WebSocket from 'ws';
import { increment, decrement } from './data/calendar';
import { capture } from './data/capture';

const prisma = new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

export default prisma;

const config = useRuntimeConfig();
// const ws = new WebSocket(`wss://${config.mmDomain}/api/v4/websocket`);

let ws: WebSocket;

// 初始化 WebSocket 连接
function connect() {
  ws = new WebSocket(`wss://${config.mmDomain}/api/v4/websocket`);

  ws.on('close', () => {
    setTimeout(connect, 1000);
  });

  ws.on('open', () => {
    function sendAuthentication() {
      const authData = {
        seq: 1,
        action: 'authentication_challenge',
        data: {
          token: config.botToken,
        },
      };
      ws.send(JSON.stringify(authData));
    }
    sendAuthentication();
  });

  ws.on('message', async (res: any) => {
    const data = JSON.parse(res);
    if (data.event === 'posted') {
      const post = JSON.parse(data.data.post) as Post;
      if (post.message.startsWith('@mcdonalds')) {
        if (post.message.includes('+1')) {
          await increment({ count: 1 });
        }
        if (post.message.includes('-1')) {
          await decrement({ count: 1 });
        }
        const { file: buffer } = await capture();
        const body = new FormData();
        const fileName = `${new Date().toISOString().replace(/:/g, '-')}.png`;
        body.append('files', new Blob([buffer as Buffer]), fileName);
        const response = await fetch(
          `https://${config.mmDomain}/api/v4/files?channel_id=${post.channel_id}&filename=${fileName}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${config.botToken}`,
            },
            body: body as any,
          },
        );
        const file = await response.json();
        fetch(`https://${config.mmDomain}/api/v4/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.botToken}`,
          },
          body: JSON.stringify({
            channel_id: post.channel_id,
            // root_id: post.id,
            file_ids: file.file_infos.map((f: any) => f.id),
          }),
        });
      }
    }
  });
}

connect();
