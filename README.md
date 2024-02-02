- 创建数据库 \ 同步数据库结构
  ```bash
  pnpm prisma db push
  ```
- 生成数据库结构的 TypeScript 类型
  ```bash
  pnpm prisma generate
  ```
- 填充初始数据到数据库(可选)
  ```bash
  pnpm db-seed
  ```
- 启动项目
  ```bash
  pnpm dev
  ```
