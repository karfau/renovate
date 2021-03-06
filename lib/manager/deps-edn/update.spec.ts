/* eslint-disable no-template-curly-in-string */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { extractPackageFile } from './extract';
import { updateDependency } from './update';

const depsEdn = readFileSync(
  resolve(__dirname, `./__fixtures__/deps.edn`),
  'utf8'
);

describe('manager/deps-edn/update', () => {
  it('updateDependency', () => {
    const { deps } = extractPackageFile(depsEdn);
    const dep = deps.pop();
    const upgrade = {
      ...dep,
      newValue: `${dep.currentValue}-9999`,
    };
    const { currentValue, newValue } = upgrade;
    const newFileContent = updateDependency({ fileContent: depsEdn, upgrade });
    const cmpContent = depsEdn.replace(currentValue, newValue);
    expect(newFileContent).toEqual(cmpContent);
  });
});
