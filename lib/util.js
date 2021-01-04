import path from 'path';
import fs from 'fs-extra';

const hostUrl = 'https://raw.githubusercontent.com';
const repositoryRegex = /.*\/(.*)\/(.*)\.git|^([^/]*)\/([^/]*)$/;
const imageRegex = /!\[(.*)]\((?!.*?:\/\/)([^ ]*?) *?( (?:'.*'|".*"))? *?\)/g;

const convertPathToPosix = (path) => path.replace(/\\/g, '/');

const isUrl = (string) => /^https?:\/\/\w/.test(string);

const getResourceUrl = (repository) =>
  `${hostUrl}/${repository.user}/${repository.name}/master/`;

const getFullImagePath = (basePath, imagePath) =>
  convertPathToPosix(path.normalize(path.join(basePath, imagePath)));

function parseRepository(string) {
  if (!string) {
    return null;
  }

  const match = string.match(repositoryRegex);
  if (!match) {
    return null;
  }

  const shorthand = Boolean(match[3]);
  return {
    user: shorthand ? match[3] : match[1],
    name: shorthand ? match[4] : match[2],
  };
}

async function getRepositoryFromPackage() {
  try {
    // TODO: search for package file upwards
    const pkg = await fs.readJson('./package.json');
    const repository = parseRepository(
      (pkg.repository && pkg.repository.url) || pkg.repository
    );
    if (!repository) {
      throw new Error('No repository property');
    }

    return repository;
  } catch (_) {
    throw new Error(
      `Cannot read repository from package.json.\nMake sure you have a "repository" attribute with your git repository URL.`
    );
  }
}

function updateImagesUrls(article, repository) {
  const data = { ...article.data };
  let { content } = article;
  const basePath = path.dirname(article.file);
  let match;

  while ((match = imageRegex.exec(article.content))) {
    const [link, alt = '', imagePath, title = ''] = match;

    if (imagePath) {
      const fullPath = getFullImagePath(basePath, imagePath);
      const newLink = `![${alt}](${getResourceUrl(
        repository
      )}${fullPath}${title})`;
      content = content.replace(link, newLink);
    }
  }

  if (data.cover_image && !isUrl(data.cover_image)) {
    const fullPath = getFullImagePath(basePath, data.cover_image);
    data.cover_image = `${getResourceUrl(repository)}${fullPath}`;
  }

  return { ...article, content, data };
}

export {
  convertPathToPosix,
  parseRepository,
  getRepositoryFromPackage,
  updateImagesUrls,
};
