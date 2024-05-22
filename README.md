# React Calendar component and Date Picker Test

- Pick days, months, years, or even decades
- No existing Calendar or DatePicker components used

[Online Demo Here!](https://stackblitz.com/~/github.com/luckyboy07/react-app-calendar)

## Props
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
     <th>Default</th>
    <th>Description</th>
     <th>Required</th>
  </tr>
  <tr>
    <td><code>date</code></td>
    <td><code>Date</code></td>
    <td><code>new Date()</code></td>
    <td>Set initial date value</td>
    <td>No</td>
  </tr>
   <tr>
    <td><code>onSelect</code></td>
    <td><code>Function</code></td>
    <td>N/A</td>
    <td>Executed when the date is updated</td>
    <td>Yes</td>
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
This will automatically run in web browser to `http://localhost:8080/`
