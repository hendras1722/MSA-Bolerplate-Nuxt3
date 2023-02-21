#! /usr/bin/env node

"use strict";

const path = require("path");
const util = require("util");
const packageJson = require("../package.json");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

async function runCmd(command: string) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    (error: string) => {
      console.log("\x1b[31m", error, "\x1b[0m");
    };
  }
}

if (process.argv.length < 3) {
  console.log("\x1b[31m", "You have to provide name to your app.");
  console.log("For example:");
  console.log("    npx react-parcel-app my-app", "\x1b[0m");
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = "https://github.com/Leopold-V/react-parcel-app.git";

try {
  fs.mkdirSync(appPath);
} catch (err: any) {
  if (err.code === "EEXIST") {
    console.log(
      "\x1b[31m",
      `The file already exist in the current directory, please give it another name.`,
      "\x1b[0m"
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log("\x1b[33m", "Downloading the project structure...", "\x1b[0m");
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

    process.chdir(appPath);

    console.log("\x1b[34m", "Installing dependencies...", "\x1b[0m");
    await runCmd("npm install");
    console.log();

    await runCmd("npx rimraf ./.git");

    fs.unlinkSync(path.join(appPath, "LICENSE.MD"));
    fs.rmdirSync(path.join(appPath, "bin"), { recursive: true });
    fs.unlinkSync(path.join(appPath, "package.json"));

    buildPackageJson(packageJson, folderName);

    console.log(
      "\x1b[32m",
      "The installation is done, this is ready to use !",
      "\x1b[0m"
    );
    console.log();

    console.log("\x1b[34m", "Horeee... You can start by typing:");
    console.log(`    cd ${folderName}`);
    console.log("    npm run dev", "\x1b[0m");
    console.log();
    console.log("Check Readme.md for more informations");
    console.log();
  } catch (error) {
    console.log(error);
  }
}

setup();

function buildPackageJson(packageJson: any, folderName: any) {
  const { bin, keywords, license, homepage, repository, bugs, ...newPackage } =
    packageJson;

  Object.assign(newPackage, {
    private: true,
    version: "1.0.0-msa",
    description:
      "This is my boilerplate for creating a new instance of the application.",
    author: "Muh Syahendra A",
    scripts: {
      build: "nuxt build",
      dev: "nuxt dev",
      generate: "nuxt generate",
      preview: "nuxt preview",
      postinstall: "nuxt prepare",
    },
    devDependencies: {
      "@types/node": "^18.14.0",
      nuxt: "^3.2.2",
    },
    dependencies: {
      "@nuxt-alt/proxy": "^2.2.0",
      sass: "^1.58.3",
      vuetify: "^3.1.4",
    },
  });

  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    "utf8"
  );
}
