# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""A command that describes a registered gcloud API."""

from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.meta import apis


class Describe(base.DescribeCommand):
  """Describe the details of an API registered in gcloud."""

  @staticmethod
  def Args(parser):
    apis.API_VERSION_FLAG.AddToParser(parser)
    parser.add_argument(
        'api_name',
        completer=apis.APICompleter,
        help='The name of the API to show the details of.')

  def Run(self, args):
    return apis.GetAPI(args.api_name, api_version=args.api_version)
