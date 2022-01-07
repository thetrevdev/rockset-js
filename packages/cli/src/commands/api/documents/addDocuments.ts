/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `data:
  - field: value
`;

class AddDocuments extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
    loadTestRps: Flags.integer({
      char: 'l',
      description:
        'If this flag is active, a load test will be conducted using this endpoint. The value passed to this flag determines how many requests per second will be sent',
    }),
    yes: Flags.boolean({
      char: 'y',
      description: 'Skip all safety prompts',
      default: false,
    }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'Name of the workspace.',
      required: true,
      hidden: false,
    },
    {
      name: 'collection',
      description: 'Name of the collection.',
      required: true,
      hidden: false,
    },
  ];

  static description = `add documents to a collection
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
data:
  - field: value


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
Add Documents
Add documents to a collection.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#adddocuments`)}`;

  static examples = [
    '$ rockset api:documents:addDocuments WORKSPACE COLLECTION --body body.yaml\n$ cat body.yaml\ndata:\n  - field: value\n\n',
  ];

  async run() {
    const { args, flags } = await this.parse(AddDocuments);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = AddDocuments.args;

    // apicall
    const apicall = client.documents.addDocuments.bind(client.documents);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}/docs';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default AddDocuments;
