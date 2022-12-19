import { $ } from 'zx';

await $`rm -rf ./data`;
await $`git clone https://github.com/monodyle/awesome-saigon-coffee.git data`;
await $`rm -rf ./data/.git`;
await $`node ./scripts/process.mjs`;
