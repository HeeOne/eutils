# Get Started

## Install & Usage

### browser

```js
<script scr="./dist/umd/@heyee/eutils.min.js"></script>
<script>
$eutils.formatNumberThousands(34566)
// console: 34,566
</script>
```

### Package

```shell
npm install @heyee/eutils
```

#### ESM

```js
import { formatNumberThousands } from '@heyee/eutils'

formatNumberThousands(34566)
// console: 34,566
```

#### CJS

```js
const { formatNumberThousands } = require('@heyee/eutils')
formatNumberThousands(34566)
// console: 34,566
```
