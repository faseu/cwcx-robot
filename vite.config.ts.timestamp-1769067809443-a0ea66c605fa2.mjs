// vite.config.ts
import path4 from "node:path";
import process4 from "node:process";
import Uni from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+plugin-uni@0.1._a5da5ce589b3baa190af3f29755e9dba/node_modules/@uni-helper/plugin-uni/src/index.js";
import UniComponents from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+vite-plugin-uni_b7d2416fc5d131e03a788d9cb42bbddd/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+vite-plugin-uni_bb9c8debda0236421a6439d73ddb0aa5/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import UniOptimization from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-ku+bundle-optimizer@1._53b0973a91f876a19b3a499e43ca5442/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import UniKuRoot from "file:///C:/Work/MY/robot/node_modules/.pnpm/@uni-ku+root@1.4.1_vite@5.2_c0ded3f42c86f74e44565dc29de27a4c/node_modules/@uni-ku/root/dist/index.mjs";
import dayjs from "file:///C:/Work/MY/robot/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///C:/Work/MY/robot/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.50.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///C:/Work/MY/robot/node_modules/.pnpm/unocss@66.0.0_postcss@8.5.6_2ea57284233e93f4ec422395ed46624f/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///C:/Work/MY/robot/node_modules/.pnpm/unplugin-auto-import@20.1.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///C:/Work/MY/robot/node_modules/.pnpm/vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///C:/Work/MY/robot/node_modules/.pnpm/vite-plugin-restart@1.0.0_v_0b7ac2f9a82bf6364aa0d69f22d0869d/node_modules/vite-plugin-restart/dist/index.js";

// scripts/open-dev-tools.js
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function _openDevTools(env = "dev") {
  const platform = process.platform;
  const { UNI_PLATFORM } = process.env;
  const uniPlatformText = UNI_PLATFORM === "mp-weixin" ? "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-alipay" ? "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F" : "\u5C0F\u7A0B\u5E8F";
  const outputDir = env === "build" ? `dist/build/${UNI_PLATFORM}` : `dist/dev/${UNI_PLATFORM}`;
  const projectPath = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(projectPath)) {
    console.log(`\u274C ${uniPlatformText}\u6784\u5EFA\u76EE\u5F55\u4E0D\u5B58\u5728:`, projectPath);
    return;
  }
  console.log(`\u{1F680} \u6B63\u5728\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177...`);
  let command = "";
  if (platform === "darwin") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-alipay") {
      command = `/Applications/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    }
  } else if (platform === "win32" || platform === "win64") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `"C:\\Program Files (x86)\\Tencent\\\u5FAE\u4FE1web\u5F00\u53D1\u8005\u5DE5\u5177\\cli.bat" -o "${projectPath}"`;
    }
  } else {
    console.log("\u274C \u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u81EA\u52A8\u6253\u5F00\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177");
    return;
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`\u274C \u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5931\u8D25:`, error.message);
      console.log(`\u{1F4A1} \u8BF7\u786E\u4FDD${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u670D\u52A1\u7AEF\u53E3\u5DF2\u542F\u7528`);
      console.log(`\u{1F4A1} \u53EF\u4EE5\u624B\u52A8\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5E76\u5BFC\u5165\u9879\u76EE:`, projectPath);
      return;
    }
    if (stderr) {
      console.log("\u26A0\uFE0F \u8B66\u544A:", stderr);
    }
    console.log(`\u2705 ${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00`);
    if (stdout) {
      console.log(stdout);
    }
  });
}
function openDevTools(options = {}) {
  const { mode = "development" } = options;
  const env = mode === "production" ? "build" : "dev";
  let isFirstBuild = true;
  return {
    name: "uni-devtools",
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes("mp")) {
        isFirstBuild = false;
        _openDevTools(env);
      }
    }
  };
}

// vite-plugins/copy-native-resources.ts
import path2 from "node:path";
import process2 from "node:process";
import fs2 from "file:///C:/Work/MY/robot/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
var DEFAULT_OPTIONS = {
  enable: true,
  sourceDir: "nativeplugins",
  targetDirName: "nativeplugins",
  verbose: true,
  logPrefix: "[copy-native-resources]"
};
function copyNativeResources(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  if (!config.enable) {
    return {
      name: "copy-native-resources-disabled",
      apply: "build",
      writeBundle() {
      }
    };
  }
  return {
    name: "copy-native-resources",
    apply: "build",
    // 只在构建时应用
    enforce: "post",
    // 在其他插件执行完毕后执行
    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config;
      try {
        const projectRoot = process2.cwd();
        const sourcePath = path2.resolve(projectRoot, sourceDir);
        const buildMode = process2.env.NODE_ENV === "production" ? "build" : "dev";
        const platform = process2.env.UNI_PLATFORM || "app";
        const targetPath = path2.resolve(
          projectRoot,
          "dist",
          buildMode,
          platform,
          targetDirName
        );
        const sourceExists = await fs2.pathExists(sourcePath);
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u5982\u9700\u4F7F\u7528\u672C\u5730\u539F\u751F\u63D2\u4EF6\uFF0C\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA nativeplugins \u76EE\u5F55`);
            console.warn(`${logPrefix} \u5E76\u6309\u7167\u5B98\u65B9\u6587\u6863\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
            console.warn(`${logPrefix} \u53C2\u8003: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`);
          }
          return;
        }
        const sourceFiles = await fs2.readdir(sourcePath);
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u8BF7\u5728 nativeplugins \u76EE\u5F55\u4E2D\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
          }
          return;
        }
        await fs2.ensureDir(targetPath);
        if (verbose) {
          console.log(`${logPrefix} \u5F00\u59CB\u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6...`);
          console.log(`${logPrefix} \u6E90\u76EE\u5F55: ${sourcePath}`);
          console.log(`${logPrefix} \u76EE\u6807\u76EE\u5F55: ${targetPath}`);
          console.log(`${logPrefix} \u6784\u5EFA\u6A21\u5F0F: ${buildMode}`);
          console.log(`${logPrefix} \u76EE\u6807\u5E73\u53F0: ${platform}`);
          console.log(`${logPrefix} \u53D1\u73B0 ${sourceFiles.length} \u4E2A\u539F\u751F\u63D2\u4EF6\u6587\u4EF6/\u76EE\u5F55`);
        }
        await fs2.copy(sourcePath, targetPath, {
          overwrite: true,
          // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false,
          // 如果目标文件存在不报错
          preserveTimestamps: true
          // 保持文件的时间戳
        });
        if (verbose) {
          console.log(`${logPrefix} \u2705 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u590D\u5236\u5B8C\u6210`);
          console.log(`${logPrefix} \u5DF2\u6210\u529F\u590D\u5236 ${sourceFiles.length} \u4E2A\u6587\u4EF6/\u76EE\u5F55\u5230\u6784\u5EFA\u76EE\u5F55`);
          console.log(`${logPrefix} \u539F\u751F\u63D2\u4EF6\u73B0\u5728\u53EF\u4EE5\u5728 App \u4E2D\u6B63\u5E38\u4F7F\u7528`);
        }
      } catch (error) {
        console.error(`${config.logPrefix} \u274C \u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u5931\u8D25:`, error);
        console.error(`${config.logPrefix} \u9519\u8BEF\u8BE6\u60C5:`, error instanceof Error ? error.message : String(error));
        console.error(`${config.logPrefix} \u8BF7\u68C0\u67E5\u6E90\u76EE\u5F55\u6743\u9650\u548C\u78C1\u76D8\u7A7A\u95F4`);
      }
    }
  };
}
function createCopyNativeResourcesPlugin(enable = true, options = {}) {
  return copyNativeResources({ enable, ...options });
}

// vite-plugins/sync-manifest-plugins.ts
import fs3 from "node:fs";
import path3 from "node:path";
import process3 from "node:process";
function syncManifestPlugin() {
  return {
    name: "sync-manifest",
    apply: "build",
    enforce: "post",
    writeBundle: {
      order: "post",
      handler() {
        const srcManifestPath = path3.resolve(process3.cwd(), "./src/manifest.json");
        const distAppPath = path3.resolve(process3.cwd(), "./dist/dev/app/manifest.json");
        try {
          const srcManifest = JSON.parse(fs3.readFileSync(srcManifestPath, "utf8"));
          const distAppDir = path3.dirname(distAppPath);
          if (!fs3.existsSync(distAppDir)) {
            fs3.mkdirSync(distAppDir, { recursive: true });
          }
          let distManifest = {};
          if (fs3.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs3.readFileSync(distAppPath, "utf8"));
          }
          if (srcManifest["app-plus"]?.distribute?.plugins) {
            if (!distManifest.plus)
              distManifest.plus = {};
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {};
            distManifest.plus.distribute.plugins = srcManifest["app-plus"].distribute.plugins;
            fs3.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2));
            console.log("\u2705 Manifest plugins \u540C\u6B65\u6210\u529F");
          }
        } catch (error) {
          console.error("\u274C \u540C\u6B65 manifest plugins \u5931\u8D25:", error);
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM } = process4.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path4.resolve(process4.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      // UniXXX 需要在 Uni 之前引入
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      UniComponents({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      UniPages({
        exclude: ["**/components/**/**.*", "**/sections/**/**.*"],
        // pages 目录为 src/pages，分包目录不能配置在pages目录下！！
        // 是个数组，可以配置多个，但是不能为pages里面的目录！！
        subPackages: [],
        dts: "src/types/uni-pages.d.ts"
      }),
      // UniOptimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      UniOptimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
      UniKuRoot({
        excludePages: ["**/components/**/**.*", "**/sections/**/**.*"]
      }),
      Uni(),
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss")).replace("%VITE_APP_TITLE%", VITE_APP_TITLE);
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 原生插件资源复制插件 - 仅在 app 平台且启用时生效
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === "app" && VITE_COPY_NATIVE_RES_ENABLE === "true",
        {
          verbose: mode === "development"
          // 开发模式显示详细日志
        }
      ),
      syncManifestPlugin(),
      // 自动打开开发者工具插件 (必须修改 .env 文件中的 VITE_WX_APPID)
      openDevTools({ mode })
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path4.join(process4.cwd(), "./src"),
        "@img": path4.join(process4.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          // 后端有/api前缀则不做处理，没有则需要去掉
          rewrite: (path5) => path5.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : []
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9vcGVuLWRldi10b29scy5qcyIsICJ2aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzIiwgInZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXb3JrXFxcXE1ZXFxcXHJvYm90XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxXb3JrXFxcXE1ZXFxcXHJvYm90XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Xb3JrL01ZL3JvYm90L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCBVbmkgZnJvbSAnQHVuaS1oZWxwZXIvcGx1Z2luLXVuaSdcclxuaW1wb3J0IFVuaUNvbXBvbmVudHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWNvbXBvbmVudHMnXHJcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xyXG5pbXBvcnQgVW5pTGF5b3V0cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbGF5b3V0cydcclxuLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbWFuaWZlc3RcclxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcclxuLy8gQHNlZSBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1wYWdlc1xyXG5pbXBvcnQgVW5pUGFnZXMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzJ1xyXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxyXG4vLyBcdTk3MDBcdTg5ODFcdTRFMEUgQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzIFx1NjNEMlx1NEVGNlx1NEUwMFx1OEQ3N1x1NEY3Rlx1NzUyOFxyXG5pbXBvcnQgVW5pUGxhdGZvcm0gZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBsYXRmb3JtJ1xyXG4vKipcclxuICogXHU1MjA2XHU1MzA1XHU0RjE4XHU1MzE2XHUzMDAxXHU2QTIxXHU1NzU3XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU4QzAzXHU3NTI4XHUzMDAxXHU3RUM0XHU0RUY2XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU1RjE1XHU3NTI4XHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VuaS1rdS9idW5kbGUtb3B0aW1pemVyXHJcbiAqL1xyXG5pbXBvcnQgVW5pT3B0aW1pemF0aW9uIGZyb20gJ0B1bmkta3UvYnVuZGxlLW9wdGltaXplcidcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3VuaS1rdS9yb290XHJcbmltcG9ydCBVbmlLdVJvb3QgZnJvbSAnQHVuaS1rdS9yb290J1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xyXG5pbXBvcnQgb3BlbkRldlRvb2xzIGZyb20gJy4vc2NyaXB0cy9vcGVuLWRldi10b29scydcclxuaW1wb3J0IHsgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbiB9IGZyb20gJy4vdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcydcclxuaW1wb3J0IHN5bmNNYW5pZmVzdFBsdWdpbiBmcm9tICcuL3ZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgLy8gQHNlZSBodHRwczovL3Vub2Nzcy5kZXYvXHJcbiAgLy8gY29uc3QgVW5vQ1NTID0gKGF3YWl0IGltcG9ydCgndW5vY3NzL3ZpdGUnKSkuZGVmYXVsdFxyXG4gIC8vIGNvbnNvbGUubG9nKG1vZGUgPT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSAvLyB0cnVlXHJcblxyXG4gIC8vIG1vZGU6IFx1NTMzQVx1NTIwNlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEZEOFx1NjYyRlx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1xyXG4gIGNvbnNvbGUubG9nKCdjb21tYW5kLCBtb2RlIC0+ICcsIGNvbW1hbmQsIG1vZGUpXHJcbiAgLy8gcG5wbSBkZXY6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IHNlcnZlIGRldmVsb3BtZW50XHJcbiAgLy8gcG5wbSBidWlsZDpoNSBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIHBucG0gZGV2Om1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcclxuICAvLyBwbnBtIGJ1aWxkOm1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIHBucG0gZGV2OmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcclxuICAvLyBwbnBtIGJ1aWxkOmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIGRldiBcdTU0OEMgYnVpbGQgXHU1NDdEXHU0RUU0XHU1M0VGXHU0RUU1XHU1MjA2XHU1MjJCXHU0RjdGXHU3NTI4IC5lbnYuZGV2ZWxvcG1lbnQgXHU1NDhDIC5lbnYucHJvZHVjdGlvbiBcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuXHJcbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52XHJcbiAgY29uc29sZS5sb2coJ1VOSV9QTEFURk9STSAtPiAnLCBVTklfUExBVEZPUk0pIC8vIFx1NUY5N1x1NTIzMCBtcC13ZWl4aW4sIGg1LCBhcHAgXHU3QjQ5XHJcblxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdlbnYnKSlcclxuICBjb25zdCB7XHJcbiAgICBWSVRFX0FQUF9QT1JULFxyXG4gICAgVklURV9TRVJWRVJfQkFTRVVSTCxcclxuICAgIFZJVEVfQVBQX1RJVExFLFxyXG4gICAgVklURV9ERUxFVEVfQ09OU09MRSxcclxuICAgIFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxyXG4gICAgVklURV9BUFBfUFJPWFlfRU5BQkxFLFxyXG4gICAgVklURV9BUFBfUFJPWFlfUFJFRklYLFxyXG4gICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFLFxyXG4gIH0gPSBlbnZcclxuICBjb25zb2xlLmxvZygnXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGIGVudiAtPiAnLCBlbnYpXHJcblxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgZW52RGlyOiAnLi9lbnYnLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDllbnZcdTc2RUVcdTVGNTVcclxuICAgIGJhc2U6IFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAvLyBVbmlYWFggXHU5NzAwXHU4OTgxXHU1NzI4IFVuaSBcdTRFNEJcdTUyNERcdTVGMTVcdTUxNjVcclxuICAgICAgVW5pTGF5b3V0cygpLFxyXG4gICAgICBVbmlQbGF0Zm9ybSgpLFxyXG4gICAgICBVbmlNYW5pZmVzdCgpLFxyXG4gICAgICBVbmlDb21wb25lbnRzKHtcclxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxyXG4gICAgICAgIGRlZXA6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OTAxMlx1NUY1Mlx1NjI2Qlx1NjNDRlx1NUI1MFx1NzZFRVx1NUY1NVx1RkYwQ1xyXG4gICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjhBXHU3NkVFXHU1RjU1XHU1NDBEXHU0RjVDXHU0RTNBXHU1NDdEXHU1NDBEXHU3QTdBXHU5NUY0XHU1MjREXHU3RjAwXHVGRjBDdHJ1ZSBcdTY1RjZcdTdFQzRcdTRFRjZcdTU0MERcdTRFM0EgXHU3NkVFXHU1RjU1XHU1NDBEK1x1N0VDNFx1NEVGNlx1NTQwRFx1RkYwQ1xyXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLCAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTc2ODRcdTdFQzRcdTRFRjZcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdUZGMDhcdTc1MjhcdTRFOEUgVHlwZVNjcmlwdCBcdTY1MkZcdTYzMDFcdUZGMDlcclxuICAgICAgfSksXHJcbiAgICAgIFVuaVBhZ2VzKHtcclxuICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKiouKicsICcqKi9zZWN0aW9ucy8qKi8qKi4qJ10sXHJcbiAgICAgICAgLy8gcGFnZXMgXHU3NkVFXHU1RjU1XHU0RTNBIHNyYy9wYWdlc1x1RkYwQ1x1NTIwNlx1NTMwNVx1NzZFRVx1NUY1NVx1NEUwRFx1ODBGRFx1OTE0RFx1N0Y2RVx1NTcyOHBhZ2VzXHU3NkVFXHU1RjU1XHU0RTBCXHVGRjAxXHVGRjAxXHJcbiAgICAgICAgLy8gXHU2NjJGXHU0RTJBXHU2NTcwXHU3RUM0XHVGRjBDXHU1M0VGXHU0RUU1XHU5MTREXHU3RjZFXHU1OTFBXHU0RTJBXHVGRjBDXHU0RjQ2XHU2NjJGXHU0RTBEXHU4MEZEXHU0RTNBcGFnZXNcdTkxQ0NcdTk3NjJcdTc2ODRcdTc2RUVcdTVGNTVcdUZGMDFcdUZGMDFcclxuICAgICAgICBzdWJQYWNrYWdlczogW10sXHJcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL3VuaS1wYWdlcy5kLnRzJyxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFVuaU9wdGltaXphdGlvbiBcdTYzRDJcdTRFRjZcdTk3MDBcdTg5ODEgcGFnZS5qc29uIFx1NjU4N1x1NEVGNlx1RkYwQ1x1NjU0NVx1NUU5NFx1NTcyOCBVbmlQYWdlcyBcdTYzRDJcdTRFRjZcdTRFNEJcdTU0MEVcdTYyNjdcdTg4NENcclxuICAgICAgVW5pT3B0aW1pemF0aW9uKHtcclxuICAgICAgICBlbmFibGU6IHtcclxuICAgICAgICAgICdvcHRpbWl6YXRpb24nOiB0cnVlLFxyXG4gICAgICAgICAgJ2FzeW5jLWltcG9ydCc6IHRydWUsXHJcbiAgICAgICAgICAnYXN5bmMtY29tcG9uZW50JzogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGR0czoge1xyXG4gICAgICAgICAgYmFzZTogJ3NyYy90eXBlcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dnZXI6IGZhbHNlLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU4MkU1XHU1QjU4XHU1NzI4XHU2NTM5XHU1M0Q4IHBhZ2VzLmpzb24gXHU3Njg0XHU2M0QyXHU0RUY2XHVGRjBDXHU4QkY3XHU1QzA2IFVuaUt1Um9vdCBcdTY1M0VcdTdGNkVcdTUxNzZcdTU0MEVcclxuICAgICAgVW5pS3VSb290KHtcclxuICAgICAgICBleGNsdWRlUGFnZXM6IFsnKiovY29tcG9uZW50cy8qKi8qKi4qJywgJyoqL3NlY3Rpb25zLyoqLyoqLionXSxcclxuICAgICAgfSksXHJcbiAgICAgIFVuaSgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gXHU0RTM0XHU2NUY2XHU4OUUzXHU1MUIzIGRjbG91ZGlvIFx1NUI5OFx1NjVCOVx1NzY4NCBAZGNsb3VkaW8vdW5pLW1wLWNvbXBpbGVyIFx1NTFGQVx1NzNCMFx1NzY4NFx1N0YxNlx1OEJEMSBCVUdcclxuICAgICAgICAvLyBcdTUzQzJcdTgwMDMgZ2l0aHViIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNsb3VkaW8vdW5pLWFwcC9pc3N1ZXMvNDk1MlxyXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1Nzk4MVx1NzUyOCB2aXRlOnZ1ZSBcdTYzRDJcdTRFRjZcdTc2ODQgZGV2VG9vbHNFbmFibGVkXHVGRjBDXHU1RjNBXHU1MjM2XHU3RjE2XHU4QkQxIHZ1ZSBcdTZBMjFcdTY3N0ZcdTY1RjYgaW5saW5lIFx1NEUzQSB0cnVlXHJcbiAgICAgICAgbmFtZTogJ2ZpeC12aXRlLXBsdWdpbi12dWUnLFxyXG4gICAgICAgIGNvbmZpZ1Jlc29sdmVkKGNvbmZpZykge1xyXG4gICAgICAgICAgY29uc3QgcGx1Z2luID0gY29uZmlnLnBsdWdpbnMuZmluZChwID0+IHAubmFtZSA9PT0gJ3ZpdGU6dnVlJylcclxuICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmFwaSAmJiBwbHVnaW4uYXBpLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcGx1Z2luLmFwaS5vcHRpb25zLmRldlRvb2xzRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgVW5vQ1NTKCksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3VuaS1hcHAnXSxcclxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXHJcbiAgICAgICAgZGlyczogWydzcmMvaG9va3MnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IGhvb2tzXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgfSksXHJcbiAgICAgIFZpdGVSZXN0YXJ0KHtcclxuICAgICAgICAvLyBcdTkwMUFcdThGQzdcdThGRDlcdTRFMkFcdTYzRDJcdTRFRjZcdUZGMENcdTU3MjhcdTRGRUVcdTY1Mzl2aXRlLmNvbmZpZy5qc1x1NjU4N1x1NEVGNlx1NTIxOVx1NEUwRFx1OTcwMFx1ODk4MVx1OTFDRFx1NjVCMFx1OEZEMFx1ODg0Q1x1NEU1Rlx1NzUxRlx1NjU0OFx1OTE0RFx1N0Y2RVxyXG4gICAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcuanMnXSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIGg1XHU3M0FGXHU1ODgzXHU1ODlFXHU1MkEwIEJVSUxEX1RJTUUgXHU1NDhDIEJVSUxEX0JSQU5DSFxyXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNScgJiYge1xyXG4gICAgICAgIG5hbWU6ICdodG1sLXRyYW5zZm9ybScsXHJcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcclxuICAgICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoJyVCVUlMRF9USU1FJScsIGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpLnJlcGxhY2UoJyVWSVRFX0FQUF9USVRMRSUnLCBWSVRFX0FQUF9USVRMRSlcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTYzRDJcdTRFRjZcdUZGMENoNSArIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjI0RFx1NUYzOVx1NTFGQVxyXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNSdcclxuICAgICAgJiYgbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgICYmIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2IC0gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcclxuICAgICAgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbihcclxuICAgICAgICBVTklfUExBVEZPUk0gPT09ICdhcHAnICYmIFZJVEVfQ09QWV9OQVRJVkVfUkVTX0VOQUJMRSA9PT0gJ3RydWUnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZlcmJvc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsIC8vIFx1NUYwMFx1NTNEMVx1NkEyMVx1NUYwRlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1xyXG4gICAgICAgIH0sXHJcbiAgICAgICksXHJcbiAgICAgIHN5bmNNYW5pZmVzdFBsdWdpbigpLFxyXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTYzRDJcdTRFRjYgKFx1NUZDNVx1OTg3Qlx1NEZFRVx1NjUzOSAuZW52IFx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NCBWSVRFX1dYX0FQUElEKVxyXG4gICAgICBvcGVuRGV2VG9vbHMoeyBtb2RlIH0pLFxyXG4gICAgXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX1ZJVEVfQVBQX1BST1hZX186IEpTT04uc3RyaW5naWZ5KFZJVEVfQVBQX1BST1hZX0VOQUJMRSksXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAvLyBhdXRvcHJlZml4ZXIoe1xyXG4gICAgICAgICAgLy8gICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgICAgICAgIC8vICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFsnPiAxJScsICdsYXN0IDIgdmVyc2lvbnMnXSxcclxuICAgICAgICAgIC8vIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMnKSxcclxuICAgICAgICAnQGltZyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMvc3RhdGljL2ltYWdlcycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIGhtcjogdHJ1ZSxcclxuICAgICAgcG9ydDogTnVtYmVyLnBhcnNlSW50KFZJVEVfQVBQX1BPUlQsIDEwKSxcclxuICAgICAgLy8gXHU0RUM1IEg1IFx1N0FFRlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1N0FFRlx1NEUwRFx1NzUxRlx1NjU0OFx1RkYwOFx1NTE3Nlx1NEVENlx1N0FFRlx1OEQ3MGJ1aWxkXHVGRjBDXHU0RTBEXHU4RDcwZGV2U2VydmVyKVxyXG4gICAgICBwcm94eTogSlNPTi5wYXJzZShWSVRFX0FQUF9QUk9YWV9FTkFCTEUpXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIFtWSVRFX0FQUF9QUk9YWV9QUkVGSVhdOiB7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0OiBWSVRFX1NFUlZFUl9CQVNFVVJMLFxyXG4gICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAvLyBcdTU0MEVcdTdBRUZcdTY3MDkvYXBpXHU1MjREXHU3RjAwXHU1MjE5XHU0RTBEXHU1MDVBXHU1OTA0XHU3NDA2XHVGRjBDXHU2Q0ExXHU2NzA5XHU1MjE5XHU5NzAwXHU4OTgxXHU1M0JCXHU2Mzg5XHJcbiAgICAgICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7VklURV9BUFBfUFJPWFlfUFJFRklYfWApLCAnJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBkcm9wOiBWSVRFX0RFTEVURV9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgIC8vIFx1NjVCOVx1NEZCRlx1OTc1RWg1XHU3QUVGXHU4QzAzXHU4QkQ1XHJcbiAgICAgIC8vIHNvdXJjZW1hcDogVklURV9TSE9XX1NPVVJDRU1BUCA9PT0gJ3RydWUnLCAvLyBcdTlFRDhcdThCQTRcdTY2MkZmYWxzZVxyXG4gICAgICB0YXJnZXQ6ICdlczYnLFxyXG4gICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTc1MjhcdTUzOEJcdTdGMjlcclxuICAgICAgbWluaWZ5OiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnID8gZmFsc2UgOiAnZXNidWlsZCcsXHJcbiAgICB9LFxyXG4gIH0pXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcV29ya1xcXFxNWVxcXFxyb2JvdFxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxXb3JrXFxcXE1ZXFxcXHJvYm90XFxcXHNjcmlwdHNcXFxcb3Blbi1kZXYtdG9vbHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1dvcmsvTVkvcm9ib3Qvc2NyaXB0cy9vcGVuLWRldi10b29scy5qc1wiO2ltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXHJcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuXHJcbi8qKlxyXG4gKiBcdTYyNTNcdTVGMDBcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcclxuICogQHBhcmFtIHtzdHJpbmd9IGVudiAtIFx1NzNBRlx1NTg4M1x1RkYwQydkZXYnIFx1NjIxNiAnYnVpbGQnXHJcbiAqL1xyXG5mdW5jdGlvbiBfb3BlbkRldlRvb2xzKGVudiA9ICdkZXYnKSB7XHJcbiAgY29uc3QgcGxhdGZvcm0gPSBwcm9jZXNzLnBsYXRmb3JtIC8vIGRhcndpbiwgd2luMzIsIGxpbnV4XHJcbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52IC8vICBtcC13ZWl4aW4sIG1wLWFsaXBheVxyXG5cclxuICBjb25zdCB1bmlQbGF0Zm9ybVRleHQgPSBVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nID8gJ1x1NUZBRVx1NEZFMVx1NUMwRlx1N0EwQlx1NUU4RicgOiBVTklfUExBVEZPUk0gPT09ICdtcC1hbGlwYXknID8gJ1x1NjUyRlx1NEVEOFx1NUI5RFx1NUMwRlx1N0EwQlx1NUU4RicgOiAnXHU1QzBGXHU3QTBCXHU1RThGJ1xyXG5cclxuICAvLyBcdTk4NzlcdTc2RUVcdThERUZcdTVGODRcdUZGMDhcdTY3ODRcdTVFRkFcdThGOTNcdTUxRkFcdTc2RUVcdTVGNTVcdUZGMDlcdUZGMENcdTY4MzlcdTYzNkVcdTczQUZcdTU4ODNcdTkwMDlcdTYyRTlcdTRFMERcdTU0MENcdTc2RUVcdTVGNTVcclxuICBjb25zdCBvdXRwdXREaXIgPSBlbnYgPT09ICdidWlsZCcgPyBgZGlzdC9idWlsZC8ke1VOSV9QTEFURk9STX1gIDogYGRpc3QvZGV2LyR7VU5JX1BMQVRGT1JNfWBcclxuICBjb25zdCBwcm9qZWN0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBvdXRwdXREaXIpXHJcblxyXG4gIC8vIFx1NjhDMFx1NjdFNVx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxyXG4gIGlmICghZnMuZXhpc3RzU3luYyhwcm9qZWN0UGF0aCkpIHtcclxuICAgIGNvbnNvbGUubG9nKGBcdTI3NEMgJHt1bmlQbGF0Zm9ybVRleHR9XHU2Nzg0XHU1RUZBXHU3NkVFXHU1RjU1XHU0RTBEXHU1QjU4XHU1NzI4OmAsIHByb2plY3RQYXRoKVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhgXHVEODNEXHVERTgwIFx1NkI2M1x1NTcyOFx1NjI1M1x1NUYwMCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3Ny4uLmApXHJcblxyXG4gIC8vIFx1NjgzOVx1NjM2RVx1NEUwRFx1NTQwQ1x1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlx1NjI2N1x1ODg0Q1x1NEUwRFx1NTQwQ1x1NTQ3RFx1NEVFNFxyXG4gIGxldCBjb21tYW5kID0gJydcclxuXHJcbiAgaWYgKHBsYXRmb3JtID09PSAnZGFyd2luJykge1xyXG4gICAgLy8gbWFjT1NcclxuICAgIGlmIChVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nKSB7XHJcbiAgICAgIGNvbW1hbmQgPSBgL0FwcGxpY2F0aW9ucy93ZWNoYXR3ZWJkZXZ0b29scy5hcHAvQ29udGVudHMvTWFjT1MvY2xpIC1vIFwiJHtwcm9qZWN0UGF0aH1cImBcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFVOSV9QTEFURk9STSA9PT0gJ21wLWFsaXBheScpIHtcclxuICAgICAgY29tbWFuZCA9IGAvQXBwbGljYXRpb25zL1x1NUMwRlx1N0EwQlx1NUU4Rlx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3Ny5hcHAvQ29udGVudHMvTWFjT1MvXHU1QzBGXHU3QTBCXHU1RThGXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3IC0tcCBcIiR7cHJvamVjdFBhdGh9XCJgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHBsYXRmb3JtID09PSAnd2luMzInIHx8IHBsYXRmb3JtID09PSAnd2luNjQnKSB7XHJcbiAgICAvLyBXaW5kb3dzXHJcbiAgICBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtd2VpeGluJykge1xyXG4gICAgICBjb21tYW5kID0gYFwiQzpcXFxcUHJvZ3JhbSBGaWxlcyAoeDg2KVxcXFxUZW5jZW50XFxcXFx1NUZBRVx1NEZFMXdlYlx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1xcXFxjbGkuYmF0XCIgLW8gXCIke3Byb2plY3RQYXRofVwiYFxyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIC8vIExpbnV4IFx1NjIxNlx1NTE3Nlx1NEVENlx1N0NGQlx1N0VERlxyXG4gICAgY29uc29sZS5sb2coJ1x1Mjc0QyBcdTVGNTNcdTUyNERcdTdDRkJcdTdFREZcdTRFMERcdTY1MkZcdTYzMDFcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTVGQUVcdTRGRTFcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcnKVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBleGVjKGNvbW1hbmQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhgXHUyNzRDIFx1NjI1M1x1NUYwMCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NTkzMVx1OEQyNTpgLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICBjb25zb2xlLmxvZyhgXHVEODNEXHVEQ0ExIFx1OEJGN1x1Nzg2RVx1NEZERCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NjcwRFx1NTJBMVx1N0FFRlx1NTNFM1x1NURGMlx1NTQyRlx1NzUyOGApXHJcbiAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDQTEgXHU1M0VGXHU0RUU1XHU2MjRCXHU1MkE4XHU2MjUzXHU1RjAwJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1RTc2XHU1QkZDXHU1MTY1XHU5ODc5XHU3NkVFOmAsIHByb2plY3RQYXRoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RkZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdcdTI2QTBcdUZFMEYgXHU4QjY2XHU1NDRBOicsIHN0ZGVycilcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhgXHUyNzA1ICR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NURGMlx1NjI1M1x1NUYwMGApXHJcblxyXG4gICAgaWYgKHN0ZG91dCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhzdGRvdXQpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NTIxQlx1NUVGQSBWaXRlIFx1NjNEMlx1NEVGNlx1RkYwQ1x1NzUyOFx1NEU4RVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1xyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFx1OTE0RFx1N0Y2RVx1OTAwOVx1OTg3OVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tb2RlIC0gXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHVGRjBDJ2RldmVsb3BtZW50JyBcdTYyMTYgJ3Byb2R1Y3Rpb24nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcGVuRGV2VG9vbHMob3B0aW9ucyA9IHt9KSB7XHJcbiAgY29uc3QgeyBtb2RlID0gJ2RldmVsb3BtZW50JyB9ID0gb3B0aW9uc1xyXG4gIC8vIFx1NjgzOVx1NjM2RSBtb2RlIFx1Nzg2RVx1NUI5QVx1NzNBRlx1NTg4M1x1RkYxQWRldmVsb3BtZW50IC0+IGRldiwgcHJvZHVjdGlvbiAtPiBidWlsZFxyXG4gIGNvbnN0IGVudiA9IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICdidWlsZCcgOiAnZGV2J1xyXG5cclxuICAvLyBcdTk5OTZcdTZCMjFcdTY3ODRcdTVFRkFcdTY4MDdcdThCQjBcclxuICBsZXQgaXNGaXJzdEJ1aWxkID0gdHJ1ZVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3VuaS1kZXZ0b29scycsXHJcbiAgICB3cml0ZUJ1bmRsZSgpIHtcclxuICAgICAgaWYgKGlzRmlyc3RCdWlsZCAmJiBwcm9jZXNzLmVudi5VTklfUExBVEZPUk0/LmluY2x1ZGVzKCdtcCcpKSB7XHJcbiAgICAgICAgaXNGaXJzdEJ1aWxkID0gZmFsc2VcclxuICAgICAgICBfb3BlbkRldlRvb2xzKGVudilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXb3JrXFxcXE1ZXFxcXHJvYm90XFxcXHZpdGUtcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcV29ya1xcXFxNWVxcXFxyb2JvdFxcXFx2aXRlLXBsdWdpbnNcXFxcY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Xb3JrL01ZL3JvYm90L3ZpdGUtcGx1Z2lucy9jb3B5LW5hdGl2ZS1yZXNvdXJjZXMudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXHJcblxyXG4vKipcclxuICogXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU5MTREXHU3RjZFXHU2M0E1XHU1M0UzXHJcbiAqXHJcbiAqIFx1NjgzOVx1NjM2RSBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcclxuICogXHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1RTk0XHU4QkU1XHU1QjU4XHU1MEE4XHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU0RTBCXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zIHtcclxuICAvKiogXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4XHU2M0QyXHU0RUY2ICovXHJcbiAgZW5hYmxlPzogYm9vbGVhblxyXG4gIC8qKlxyXG4gICAqIFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NFx1RkYwQ1x1NzZGOFx1NUJGOVx1NEU4RVx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVxyXG4gICAqIFx1OUVEOFx1OEJBNFx1NEUzQSAnbmF0aXZlcGx1Z2lucydcdUZGMENcdTdCMjZcdTU0MDggVW5pQXBwIFx1NUI5OFx1NjVCOVx1ODlDNFx1ODMwM1xyXG4gICAqIEBzZWUgaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcclxuICAgKi9cclxuICBzb3VyY2VEaXI/OiBzdHJpbmdcclxuICAvKipcclxuICAgKiBcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcdUZGMENcdTY3ODRcdTVFRkFcdTU0MEVcdTU3MjggZGlzdCBcdTc2RUVcdTVGNTVcdTRFMkRcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MERcclxuICAgKiBcdTlFRDhcdThCQTRcdTRFM0EgJ25hdGl2ZXBsdWdpbnMnXHVGRjBDXHU0RTBFXHU2RTkwXHU3NkVFXHU1RjU1XHU0RkREXHU2MzAxXHU0RTAwXHU4MUY0XHJcbiAgICovXHJcbiAgdGFyZ2V0RGlyTmFtZT86IHN0cmluZ1xyXG4gIC8qKiBcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdThCRTZcdTdFQzZcdTY1RTVcdTVGRDdcdUZGMENcdTRGQkZcdTRFOEVcdThDMDNcdThCRDVcdTU0OENcdTc2RDFcdTYzQTdcdTU5MERcdTUyMzZcdThGQzdcdTdBMEIgKi9cclxuICB2ZXJib3NlPzogYm9vbGVhblxyXG4gIC8qKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTY1RTVcdTVGRDdcdTUyNERcdTdGMDBcdUZGMENcdTc1MjhcdTRFOEVcdTUzM0FcdTUyMDZcdTRFMERcdTU0MENcdTYzRDJcdTRFRjZcdTc2ODRcdTY1RTVcdTVGRDdcdThGOTNcdTUxRkEgKi9cclxuICBsb2dQcmVmaXg/OiBzdHJpbmdcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxyXG4gKlxyXG4gKiBcdTY4MzlcdTYzNkUgVW5pQXBwIFx1NUI5OFx1NjVCOVx1NjU4N1x1Njg2M1x1ODlDNFx1ODMwM1x1OEJCRVx1N0Y2RVx1OUVEOFx1OEJBNFx1NTAzQ1x1RkYxQVxyXG4gKiAtIHNvdXJjZURpcjogJ25hdGl2ZXBsdWdpbnMnIC0gXHU3QjI2XHU1NDA4XHU1Qjk4XHU2NUI5XHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1QjU4XHU1MEE4XHU4OUM0XHU4MzAzXHJcbiAqIC0gdGFyZ2V0RGlyTmFtZTogJ25hdGl2ZXBsdWdpbnMnIC0gXHU2Nzg0XHU1RUZBXHU1NDBFXHU0RkREXHU2MzAxXHU3NkY4XHU1NDBDXHU3Njg0XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XHJcbiAqL1xyXG5jb25zdCBERUZBVUxUX09QVElPTlM6IFJlcXVpcmVkPENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zPiA9IHtcclxuICBlbmFibGU6IHRydWUsXHJcbiAgc291cmNlRGlyOiAnbmF0aXZlcGx1Z2lucycsXHJcbiAgdGFyZ2V0RGlyTmFtZTogJ25hdGl2ZXBsdWdpbnMnLFxyXG4gIHZlcmJvc2U6IHRydWUsXHJcbiAgbG9nUHJlZml4OiAnW2NvcHktbmF0aXZlLXJlc291cmNlc10nLFxyXG59XHJcblxyXG4vKipcclxuICogVW5pQXBwIFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlx1NjNEMlx1NEVGNlxyXG4gKlxyXG4gKiBcdTUyOUZcdTgwRkRcdThCRjRcdTY2MEVcdUZGMUFcclxuICogMS4gXHU4OUUzXHU1MUIzIFVuaUFwcCBcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1RjZcdUZGMENcdTYyNTNcdTUzMDVcdTU0MEVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTYyN0VcdTRFMERcdTUyMzBcdTc2ODRcdTk1RUVcdTk4OThcclxuICogMi4gXHU1QzA2XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU1OTBEXHU1MjM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHU0RTJEXHJcbiAqIDMuIFx1NjUyRlx1NjMwMSBBbmRyb2lkIFx1NTQ4QyBpT1MgXHU1RTczXHU1M0YwXHU3Njg0XHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHJcbiAqIDQuIFx1NEVDNVx1NTcyOCBhcHAgXHU1RTczXHU1M0YwXHU2Nzg0XHU1RUZBXHU2NUY2XHU3NTFGXHU2NTQ4XHVGRjBDXHU1MTc2XHU0RUQ2XHU1RTczXHU1M0YwXHVGRjA4SDVcdTMwMDFcdTVDMEZcdTdBMEJcdTVFOEZcdUZGMDlcdTRFMERcdTYyNjdcdTg4NENcclxuICpcclxuICogXHU0RjdGXHU3NTI4XHU1NzNBXHU2NjZGXHVGRjFBXHJcbiAqIC0gXHU0RjdGXHU3NTI4XHU0RTg2IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdUZGMDhcdTk3NUVcdTRFOTFcdTdBRUZcdTYzRDJcdTRFRjZcdUZGMDlcclxuICogLSBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTUzMDVcdTU0MkJcdTk4OURcdTU5MTZcdTc2ODRcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdUZGMDhcdTU5ODIgLnNvIFx1NUU5M1x1NjU4N1x1NEVGNlx1MzAwMVx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1N0I0OVx1RkYwOVxyXG4gKiAtIFx1OTcwMFx1ODk4MVx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NzY4NFx1NUI4Q1x1NjU3NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxyXG4gKlxyXG4gKiBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTUzQzJcdTgwMDNcdUZGMUFcclxuICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWwjJUU2JTlDJUFDJUU1JTlDJUIwJUU2JThGJTkyJUU0JUJCJUI2LSVFOSU5RCU5RSVFNSU4NiU4NSVFNyVCRCVBRSVFNSU4RSU5RiVFNyU5NCU5RiVFNiU4RiU5MiVFNCVCQiVCNlxyXG4gKiBAc2VlIGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vdHV0b3JpYWwvbnZ1ZS1hcGkuaHRtbCNkb21cclxuICpcclxuICogQHBhcmFtIG9wdGlvbnMgXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHU5MDA5XHU5ODc5XHJcbiAqIEByZXR1cm5zIFZpdGUgXHU2M0QyXHU0RUY2XHU1QkY5XHU4QzYxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weU5hdGl2ZVJlc291cmNlcyhvcHRpb25zOiBDb3B5TmF0aXZlUmVzb3VyY2VzT3B0aW9ucyA9IHt9KTogUGx1Z2luIHtcclxuICBjb25zdCBjb25maWcgPSB7IC4uLkRFRkFVTFRfT1BUSU9OUywgLi4ub3B0aW9ucyB9XHJcblxyXG4gIC8vIFx1NTk4Mlx1Njc5Q1x1NjNEMlx1NEVGNlx1ODhBQlx1Nzk4MVx1NzUyOFx1RkYwQ1x1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1N0E3QVx1NjNEMlx1NEVGNlxyXG4gIGlmICghY29uZmlnLmVuYWJsZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogJ2NvcHktbmF0aXZlLXJlc291cmNlcy1kaXNhYmxlZCcsXHJcbiAgICAgIGFwcGx5OiAnYnVpbGQnLFxyXG4gICAgICB3cml0ZUJ1bmRsZSgpIHtcclxuICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTVERjJcdTc5ODFcdTc1MjhcdUZGMENcdTRFMERcdTYyNjdcdTg4NENcdTRFRkJcdTRGNTVcdTY0Q0RcdTRGNUNcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnY29weS1uYXRpdmUtcmVzb3VyY2VzJyxcclxuICAgIGFwcGx5OiAnYnVpbGQnLCAvLyBcdTUzRUFcdTU3MjhcdTY3ODRcdTVFRkFcdTY1RjZcdTVFOTRcdTc1MjhcclxuICAgIGVuZm9yY2U6ICdwb3N0JywgLy8gXHU1NzI4XHU1MTc2XHU0RUQ2XHU2M0QyXHU0RUY2XHU2MjY3XHU4ODRDXHU1QjhDXHU2QkQ1XHU1NDBFXHU2MjY3XHU4ODRDXHJcblxyXG4gICAgYXN5bmMgd3JpdGVCdW5kbGUoKSB7XHJcbiAgICAgIGNvbnN0IHsgc291cmNlRGlyLCB0YXJnZXREaXJOYW1lLCB2ZXJib3NlLCBsb2dQcmVmaXggfSA9IGNvbmZpZ1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcclxuICAgICAgICBjb25zdCBwcm9qZWN0Um9vdCA9IHByb2Nlc3MuY3dkKClcclxuXHJcbiAgICAgICAgLy8gXHU2Nzg0XHU1RUZBXHU2RTkwXHU3NkVFXHU1RjU1XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHVGRjA5XHJcbiAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9qZWN0Um9vdCwgc291cmNlRGlyKVxyXG5cclxuICAgICAgICAvLyBcdTY3ODRcdTVFRkFcdTc2RUVcdTY4MDdcdThERUZcdTVGODRcdUZGMUFkaXN0L1tidWlsZHxkZXZdL1twbGF0Zm9ybV0vbmF0aXZlcGx1Z2luc1xyXG4gICAgICAgIC8vIGJ1aWxkTW9kZTogJ2J1aWxkJyAoXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzKSBcdTYyMTYgJ2RldicgKFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4MylcclxuICAgICAgICAvLyBwbGF0Zm9ybTogJ2FwcCcgKEFwcFx1NUU3M1x1NTNGMCkgXHU2MjE2XHU1MTc2XHU0RUQ2XHU1RTczXHU1M0YwXHU2ODA3XHU4QkM2XHJcbiAgICAgICAgY29uc3QgYnVpbGRNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdidWlsZCcgOiAnZGV2J1xyXG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gcHJvY2Vzcy5lbnYuVU5JX1BMQVRGT1JNIHx8ICdhcHAnXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZShcclxuICAgICAgICAgIHByb2plY3RSb290LFxyXG4gICAgICAgICAgJ2Rpc3QnLFxyXG4gICAgICAgICAgYnVpbGRNb2RlLFxyXG4gICAgICAgICAgcGxhdGZvcm0sXHJcbiAgICAgICAgICB0YXJnZXREaXJOYW1lLFxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2RTkwXHU3NkVFXHU1RjU1XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU0RTBEXHU1QjU4XHU1NzI4IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHVGRjBDXHU4QkY0XHU2NjBFXHU5ODc5XHU3NkVFXHU2Q0ExXHU2NzA5XHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHJcbiAgICAgICAgY29uc3Qgc291cmNlRXhpc3RzID0gYXdhaXQgZnMucGF0aEV4aXN0cyhzb3VyY2VQYXRoKVxyXG4gICAgICAgIGlmICghc291cmNlRXhpc3RzKSB7XHJcbiAgICAgICAgICBpZiAodmVyYm9zZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdTRFMERcdTVCNThcdTU3MjhcdUZGMENcdThERjNcdThGQzdcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNgKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODQ6ICR7c291cmNlUGF0aH1gKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTU5ODJcdTk3MDBcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdUZGMENcdThCRjdcdTU3MjhcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdTUyMUJcdTVFRkEgbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVgKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTVFNzZcdTYzMDlcdTcxNjdcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTY1M0VcdTUxNjVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1ODdcdTRFRjZgKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTUzQzJcdTgwMDM6IGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vcGx1Z2luL25hdGl2ZS1wbHVnaW4uaHRtbGApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NEUzQVx1N0E3QVxyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFx1NEY0Nlx1NEUzQVx1N0E3QVx1RkYwQ1x1NEU1Rlx1OERGM1x1OEZDN1x1NTkwRFx1NTIzNlx1NjRDRFx1NEY1Q1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUZpbGVzID0gYXdhaXQgZnMucmVhZGRpcihzb3VyY2VQYXRoKVxyXG4gICAgICAgIGlmIChzb3VyY2VGaWxlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGlmICh2ZXJib3NlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1NEUzQVx1N0E3QVx1RkYwQ1x1OERGM1x1OEZDN1x1NTkwRFx1NTIzNlx1NjRDRFx1NEY1Q2ApXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NDogJHtzb3VyY2VQYXRofWApXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1OEJGN1x1NTcyOCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NEUyRFx1NjUzRVx1NTE2NVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjU4N1x1NEVGNmApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NVx1NTNDQVx1NTE3Nlx1NzIzNlx1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFxyXG4gICAgICAgIGF3YWl0IGZzLmVuc3VyZURpcih0YXJnZXRQYXRoKVxyXG5cclxuICAgICAgICBpZiAodmVyYm9zZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTVGMDBcdTU5Q0JcdTU5MERcdTUyMzYgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNi4uLmApXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NTogJHtzb3VyY2VQYXRofWApXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NzZFRVx1NjgwN1x1NzZFRVx1NUY1NTogJHt0YXJnZXRQYXRofWApXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRjogJHtidWlsZE1vZGV9YClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU3NkVFXHU2ODA3XHU1RTczXHU1M0YwOiAke3BsYXRmb3JtfWApXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NTNEMVx1NzNCMCAke3NvdXJjZUZpbGVzLmxlbmd0aH0gXHU0RTJBXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NTg3XHU0RUY2L1x1NzZFRVx1NUY1NWApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBcdTYyNjdcdTg4NENcdTY1ODdcdTRFRjZcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNcclxuICAgICAgICAvLyBcdTVDMDZcdTY1NzRcdTRFMkEgbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdTU5MERcdTUyMzZcdTUyMzBcdTY3ODRcdTVFRkFcdThGOTNcdTUxRkFcdTc2RUVcdTVGNTVcclxuICAgICAgICBhd2FpdCBmcy5jb3B5KHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIHtcclxuICAgICAgICAgIG92ZXJ3cml0ZTogdHJ1ZSwgLy8gXHU4OTg2XHU3NkQ2XHU1REYyXHU1QjU4XHU1NzI4XHU3Njg0XHU2NTg3XHU0RUY2XHVGRjBDXHU3ODZFXHU0RkREXHU0RjdGXHU3NTI4XHU2NzAwXHU2NUIwXHU3MjQ4XHU2NzJDXHJcbiAgICAgICAgICBlcnJvck9uRXhpc3Q6IGZhbHNlLCAvLyBcdTU5ODJcdTY3OUNcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdTVCNThcdTU3MjhcdTRFMERcdTYyQTVcdTk1MTlcclxuICAgICAgICAgIHByZXNlcnZlVGltZXN0YW1wczogdHJ1ZSwgLy8gXHU0RkREXHU2MzAxXHU2NTg3XHU0RUY2XHU3Njg0XHU2NUY2XHU5NUY0XHU2MjMzXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKHZlcmJvc2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHUyNzA1IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTU5MERcdTUyMzZcdTVCOENcdTYyMTBgKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTVERjJcdTYyMTBcdTUyOUZcdTU5MERcdTUyMzYgJHtzb3VyY2VGaWxlcy5sZW5ndGh9IFx1NEUyQVx1NjU4N1x1NEVGNi9cdTc2RUVcdTVGNTVcdTUyMzBcdTY3ODRcdTVFRkFcdTc2RUVcdTVGNTVgKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTczQjBcdTU3MjhcdTUzRUZcdTRFRTVcdTU3MjggQXBwIFx1NEUyRFx1NkI2M1x1NUUzOFx1NEY3Rlx1NzUyOGApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y29uZmlnLmxvZ1ByZWZpeH0gXHUyNzRDIFx1NTkwRFx1NTIzNiBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1OTMxXHU4RDI1OmAsIGVycm9yKVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Y29uZmlnLmxvZ1ByZWZpeH0gXHU5NTE5XHU4QkVGXHU4QkU2XHU2MEM1OmAsIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1OEJGN1x1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1Njc0M1x1OTY1MFx1NTQ4Q1x1NzhDMVx1NzZEOFx1N0E3QVx1OTVGNGApXHJcbiAgICAgICAgLy8gXHU0RTBEXHU2MjlCXHU1MUZBXHU5NTE5XHU4QkVGXHVGRjBDXHU5MDdGXHU1MTREXHU1RjcxXHU1NENEXHU2NTc0XHU0RTJBXHU2Nzg0XHU1RUZBXHU4RkM3XHU3QTBCXHVGRjBDXHU0RjQ2XHU0RjFBXHU4QkIwXHU1RjU1XHU4QkU2XHU3RUM2XHU3Njg0XHU5NTE5XHU4QkVGXHU0RkUxXHU2MDZGXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBIFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjZcdTc2ODRcdTRGQkZcdTYzNzdcdTUxRkRcdTY1NzBcclxuICpcclxuICogXHU4RkQ5XHU2NjJGXHU0RTAwXHU0RTJBXHU0RkJGXHU2Mzc3XHU3Njg0XHU1REU1XHU1MzgyXHU1MUZEXHU2NTcwXHVGRjBDXHU3NTI4XHU0RThFXHU1RkVCXHU5MDFGXHU1MjFCXHU1RUZBXHU2M0QyXHU0RUY2XHU1QjlFXHU0RjhCXHJcbiAqIFx1NzI3OVx1NTIyQlx1OTAwMlx1NzUyOFx1NEU4RVx1NTcyOCB2aXRlLmNvbmZpZy50cyBcdTRFMkRcdThGREJcdTg4NENcdTY3NjFcdTRFRjZcdTYwMjdcdTYzRDJcdTRFRjZcdTkxNERcdTdGNkVcclxuICpcclxuICogXHU0RjdGXHU3NTI4XHU3OTNBXHU0RjhCXHVGRjFBXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogLy8gXHU1NzI4IHZpdGUuY29uZmlnLnRzIFx1NEUyRFxyXG4gKiBwbHVnaW5zOiBbXHJcbiAqICAgLy8gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcclxuICogICBVTklfUExBVEZPUk0gPT09ICdhcHAnXHJcbiAqICAgICA/IGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXHJcbiAqICAgICAgICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFID09PSAndHJ1ZScsXHJcbiAqICAgICAgICAgeyB2ZXJib3NlOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnIH1cclxuICogICAgICAgKVxyXG4gKiAgICAgOiBudWxsLFxyXG4gKiBdXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcGFyYW0gZW5hYmxlIFx1NjYyRlx1NTQyNlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNlx1RkYwQ1x1OTAxQVx1NUUzOFx1OTAxQVx1OEZDN1x1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NjNBN1x1NTIzNlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBcdTUxNzZcdTRFRDZcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcdUZGMENcdTRFMERcdTUzMDVcdTU0MkIgZW5hYmxlIFx1NUM1RVx1NjAyN1xyXG4gKiBAcmV0dXJucyBWaXRlIFx1NjNEMlx1NEVGNlx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXHJcbiAgZW5hYmxlOiBib29sZWFuID0gdHJ1ZSxcclxuICBvcHRpb25zOiBPbWl0PENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zLCAnZW5hYmxlJz4gPSB7fSxcclxuKTogUGx1Z2luIHtcclxuICByZXR1cm4gY29weU5hdGl2ZVJlc291cmNlcyh7IGVuYWJsZSwgLi4ub3B0aW9ucyB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcV29ya1xcXFxNWVxcXFxyb2JvdFxcXFx2aXRlLXBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFdvcmtcXFxcTVlcXFxccm9ib3RcXFxcdml0ZS1wbHVnaW5zXFxcXHN5bmMtbWFuaWZlc3QtcGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovV29yay9NWS9yb2JvdC92aXRlLXBsdWdpbnMvc3luYy1tYW5pZmVzdC1wbHVnaW5zLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcblxyXG5pbnRlcmZhY2UgTWFuaWZlc3RUeXBlIHtcclxuICAncGx1cyc/OiB7XHJcbiAgICBkaXN0cmlidXRlPzoge1xyXG4gICAgICBwbHVnaW5zPzogUmVjb3JkPHN0cmluZywgYW55PlxyXG4gICAgfVxyXG4gIH1cclxuICAnYXBwLXBsdXMnPzoge1xyXG4gICAgZGlzdHJpYnV0ZT86IHtcclxuICAgICAgcGx1Z2lucz86IFJlY29yZDxzdHJpbmcsIGFueT5cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bmNNYW5pZmVzdFBsdWdpbigpOiBQbHVnaW4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3luYy1tYW5pZmVzdCcsXHJcbiAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgIGVuZm9yY2U6ICdwb3N0JyxcclxuICAgIHdyaXRlQnVuZGxlOiB7XHJcbiAgICAgIG9yZGVyOiAncG9zdCcsXHJcbiAgICAgIGhhbmRsZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc3JjTWFuaWZlc3RQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuL3NyYy9tYW5pZmVzdC5qc29uJylcclxuICAgICAgICBjb25zdCBkaXN0QXBwUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLi9kaXN0L2Rldi9hcHAvbWFuaWZlc3QuanNvbicpXHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBcdThCRkJcdTUzRDZcdTZFOTBcdTY1ODdcdTRFRjZcclxuICAgICAgICAgIGNvbnN0IHNyY01hbmlmZXN0ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoc3JjTWFuaWZlc3RQYXRoLCAndXRmOCcpKSBhcyBNYW5pZmVzdFR5cGVcclxuXHJcbiAgICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcclxuICAgICAgICAgIGNvbnN0IGRpc3RBcHBEaXIgPSBwYXRoLmRpcm5hbWUoZGlzdEFwcFBhdGgpXHJcbiAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdEFwcERpcikpIHtcclxuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpc3RBcHBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gXHU4QkZCXHU1M0Q2XHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHVGRjA4XHU1OTgyXHU2NzlDXHU1QjU4XHU1NzI4XHVGRjA5XHJcbiAgICAgICAgICBsZXQgZGlzdE1hbmlmZXN0OiBNYW5pZmVzdFR5cGUgPSB7fVxyXG4gICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdEFwcFBhdGgpKSB7XHJcbiAgICAgICAgICAgIGRpc3RNYW5pZmVzdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGRpc3RBcHBQYXRoLCAndXRmOCcpKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NkU5MFx1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOCBwbHVnaW5zXHJcbiAgICAgICAgICBpZiAoc3JjTWFuaWZlc3RbJ2FwcC1wbHVzJ10/LmRpc3RyaWJ1dGU/LnBsdWdpbnMpIHtcclxuICAgICAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHU0RTJEXHU2NzA5XHU1RkM1XHU4OTgxXHU3Njg0XHU1QkY5XHU4QzYxXHU3RUQzXHU2Nzg0XHJcbiAgICAgICAgICAgIGlmICghZGlzdE1hbmlmZXN0LnBsdXMpXHJcbiAgICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMgPSB7fVxyXG4gICAgICAgICAgICBpZiAoIWRpc3RNYW5pZmVzdC5wbHVzLmRpc3RyaWJ1dGUpXHJcbiAgICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZSA9IHt9XHJcblxyXG4gICAgICAgICAgICAvLyBcdTU5MERcdTUyMzYgcGx1Z2lucyBcdTUxODVcdTVCQjlcclxuICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZS5wbHVnaW5zID0gc3JjTWFuaWZlc3RbJ2FwcC1wbHVzJ10uZGlzdHJpYnV0ZS5wbHVnaW5zXHJcblxyXG4gICAgICAgICAgICAvLyBcdTUxOTlcdTUxNjVcdTY2RjRcdTY1QjBcdTU0MEVcdTc2ODRcdTUxODVcdTVCQjlcclxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXN0QXBwUGF0aCwgSlNPTi5zdHJpbmdpZnkoZGlzdE1hbmlmZXN0LCBudWxsLCAyKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1MjcwNSBNYW5pZmVzdCBwbHVnaW5zIFx1NTQwQ1x1NkI2NVx1NjIxMFx1NTI5RicpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignXHUyNzRDIFx1NTQwQ1x1NkI2NSBtYW5pZmVzdCBwbHVnaW5zIFx1NTkzMVx1OEQyNTonLCBlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBPLE9BQU9BLFdBQVU7QUFDM1AsT0FBT0MsY0FBYTtBQUNwQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxtQkFBbUI7QUFFMUIsT0FBTyxnQkFBZ0I7QUFFdkIsT0FBTyxpQkFBaUI7QUFFeEIsT0FBTyxjQUFjO0FBR3JCLE9BQU8saUJBQWlCO0FBS3hCLE9BQU8scUJBQXFCO0FBRTVCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8s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QUNMLEtBQUtDLE1BQUssS0FBS0QsU0FBUSxJQUFJLEdBQUcsT0FBTztBQUFBLFFBQ3JDLFFBQVFDLE1BQUssS0FBS0QsU0FBUSxJQUFJLEdBQUcscUJBQXFCO0FBQUEsTUFDeEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxNQUFNLE9BQU8sU0FBUyxlQUFlLEVBQUU7QUFBQTtBQUFBLE1BRXZDLE9BQU8sS0FBSyxNQUFNLHFCQUFxQixJQUNuQztBQUFBLFFBQ0UsQ0FBQyxxQkFBcUIsR0FBRztBQUFBLFVBQ3ZCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFBQyxVQUFRQSxNQUFLLFFBQVEsSUFBSSxPQUFPLElBQUkscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0FBQUEsUUFDM0U7QUFBQSxNQUNGLElBQ0E7QUFBQSxJQUNOO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNLHdCQUF3QixTQUFTLENBQUMsV0FBVyxVQUFVLElBQUksQ0FBQztBQUFBLElBQ3BFO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUE7QUFBQTtBQUFBLE1BR1gsUUFBUTtBQUFBO0FBQUEsTUFFUixRQUFRLFNBQVMsZ0JBQWdCLFFBQVE7QUFBQSxJQUMzQztBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicHJvY2VzcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicHJvY2VzcyIsICJwYXRoIiwgImZzIiwgImZzIiwgInBhdGgiLCAicHJvY2VzcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicHJvY2VzcyIsICJwYXRoIl0KfQo=
