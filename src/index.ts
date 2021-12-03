// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import path from 'path';
import { IMarkdwonComponent } from '@umijs/preset-dumi/lib/transformer/remark/mdComponent';
import { IUsers } from './Trusted';

export default function(api: IApi) {
  api.register({
    key: 'dumi.registerMdComponent',
    fn: (): IMarkdwonComponent => ({
      name: 'Trusted',
      component: path.join(__dirname, 'Trusted.js'),
      compiler(node) {
        const fileAbsPath = this.data('fileAbsPath') as string;
        const userPath = path.join(
          path.dirname(fileAbsPath),
          node.properties.users,
        );
        const content: IUsers[] = require(userPath);
        content.sort((a, b) => a.name.localeCompare(b.name));
        delete node.properties.users;
        node.properties.users = content;
      },
    }),
  });
}
