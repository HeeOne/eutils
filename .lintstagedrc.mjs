export default {
  '*.md': ['prettier --cache --ignore-unknown --write'],
  '*.vue': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['prettier --cache --ignore-unknown  --write'],
  '*.{scss,less,styl,html,vue,css}': ['prettier --cache --ignore-unknown --write'],
  'package.json': ['prettier --cache --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --cache --write--parser json',
  ],
}
