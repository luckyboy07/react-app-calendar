# React Calendar component and Date Picker Test

- Pick days, months, years, or even decades
- No date library

[Online Demo Here!](https://stackblitz.com/~/github.com/luckyboy07/react-app-calendar)

## Props
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
     <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>date</code></td>
    <td><code>Date</code></td>
    <td><code>new Date()</code></td>
    <td>Set initial date or selected date value 
  </tr>
   <tr>
    <td><code>onSelect</code></td>
    <td><code>Function</code> called when the user picks a valid date</td>
    <td>N/A</td>
    <td>Called when the date is selected
  </tr>
</table>

# Usage

### Install dependencies

```bash
npm install
```

### Run

```bash
npm run start
```

### Build
```
npm run build
```
### Eslint
There is a `.eslintrc` config for eslint ready.

To run linting, run:

```
npm run lint
```

This will run on port :8080
