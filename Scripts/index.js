#!/usr/bin/env node
'use strict';

const spawn = require('cross-spawn');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');
const path = require("path");
const fs = require("fs");


// OPTIONS
const OPTIONS = {
  TEMPLATE: 'template',
}

// TEMPLATES
const TEMPLATES = {
  MF_VITE_REACT: 'mf-vite-react',
  ROOT_CONFIG: 'vite-root-config',
}

const argv = yargs(hideBin(process.argv))
  .command({
    command: 'create',
    aliases: 'crt',
    desc: 'create a new micro front-end template',
    builder: {
      template: {
        alias: 't',
        default: TEMPLATES.MF_VITE_REACT,
      },
      name: {
        alias: 'n',
        demandOption: true,
      },
      root: {
        alias: 'r',
        boolean: true,
        conflicts: ['template'],
      }
    },
    handler: (args) => {
      const projectName = args.name;

      const currentDir = process.cwd();
      const projectDir = path.resolve(currentDir, projectName);

      if (!args.r && !Object.values(TEMPLATES).find(t => t === args.t)) {
        console.log(`the template given "${args.t}" is not implemented by now`)
        return;
      }

      fs.mkdirSync(projectDir, {recursive: true});

      const templateDir = args.r ? path.resolve(__dirname, `template/${TEMPLATES.ROOT_CONFIG}`) : path.resolve(__dirname, `templates/${args.t}`);

      fs.cpSync(templateDir, projectDir, {recursive: true});

      const projectPackageJson = require(path.join(projectDir, 'package.json'));

      projectPackageJson.name = projectName.toLowerCase();

      fs.writeFileSync(
        path.join(projectDir, 'package.json'),
        JSON.stringify(projectPackageJson, null, 2)
      );

      console.log('Success! Your new project is ready.');
      console.log(`Created ${projectName} at ${projectDir}`);
    }
  })
  .fail(false)
  .help()
  .argv;





