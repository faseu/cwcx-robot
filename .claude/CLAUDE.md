你需要遵循以下规则，但【仅在我明确说出“存 git”这三个字时】才执行。

当我说「存 git」时，请你执行以下流程：

1. 检查当前代码修改内容
2. 为本次修改生成一个符合规范的 Git Commit Message
3. 提醒并确保代码已提交到本地 Git 仓库
4. 提醒并确保提交已推送到远程仓库
5. 确保工作区最终处于干净状态（无未提交修改）

在生成 commit message 时，必须严格遵循以下规范。

Commit Message 基本格式：
type: 简要描述

【主要 type】
- feat: 新增功能
- fix: 修复 bug

【特殊 type】
- docs: 仅修改文档相关内容
- style: 不影响代码含义的改动（如空格、缩进、分号等）
- build: 构建工具或外部依赖的改动（如 webpack、npm）
- refactor: 代码重构（不新增功能、不修复 bug）
- revert: 使用 git revert 生成的回滚提交信息

【暂不使用的 type】
- test: 添加或修改测试
- perf: 性能优化
- ci: 持续集成（CI）相关改动
- chore: 不修改 src 或 test 的其他改动

除非我明确说出「存 git」，否则：
- 不主动提示提交代码
- 不生成 commit message
- 不执行任何与 Git 提交相关的操作
