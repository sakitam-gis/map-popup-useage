const path = require('path');
const fs = require('fs-extra');
const ghpages = require('gh-pages');
const exec = require('child_process').execSync;

const baseDir = 'packages/';
const distDir = '/dist/';
const siteDir = '_site/';

async function copyAndRebuild() {
  try {
    if (!fs.existsSync(siteDir)) {
      fs.mkdirSync(siteDir);
    } else {
      await fs.emptyDir(siteDir);
    }

    const mainDist = `${baseDir}main${distDir}`;
    const vueDist = `${baseDir}vue-maptalks${distDir}`;
    const reactDist = `${baseDir}react-maptalks${distDir}`;

    await fs.remove(vueDist);
    await fs.remove(reactDist);
    exec('yarn run build');

    await fs.copy(vueDist, siteDir);
    const vueData = fs.readFileSync(`${vueDist}index.html`, 'utf8');
    await fs.copy(reactDist, siteDir);
    const reactData = fs.readFileSync(`${reactDist}index.html`, 'utf8');

    fs.writeFileSync(`${baseDir}main/tempString.js`, `// ! don't edit this file, this file will auto write by deploy.js
export const code_vue = \`${vueData}\`;
export const code_react = \`${reactData}\`;
`);

    await fs.remove(mainDist);

    exec('cd packages/main && yarn run rebuild');
    await fs.copy(mainDist, siteDir);
  } catch (e) {
    console.error(e);
  }
}

copyAndRebuild().then(res => {
  // ghpages.publish(path.join(__dirname, './_site'), function (err) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log('publish to github page done')
  //   }
  // });
}).catch(e => console.log(e));
