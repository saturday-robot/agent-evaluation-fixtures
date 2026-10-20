# Agent evaluation fixtures

Each branch is a separate starting project. Gauge scenarios are pinned to commits so future edits do not change a baseline. All data is synthetic. No live service credentials are included.

| Starting project | Contents |
| --- | --- |
| [order-tracker](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/8c3543bfbe7b3ee941a904947ff88ddb7525be7e) | React order tracker; localStorage; no login/backend. |
| [dispatch-board](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/3b87bbad69af64000f5f0bc73088e4db5104f27a) | General React dispatch demo; no login/backend. Not a Bolt export. |
| [inventory-local](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/feac5d561440c355643f2f67550941f6aab38119) | General React inventory demo; local data; no Supabase connection. |
| [orders-login](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/1d878cbcb6b80db319b71d645abfc7659cfd06c0) | React + local Node API and JSON-file persistence. Two demo users, both can edit. No roles/audit log. |
| [csv-inputs](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/11d1e8378494c3277b7be54cad8aefa3ae1c3b39) | Dirty synthetic CSV uploads; no cleanup implementation. |
| [approval-spreadsheet](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/abc9ac35cb511ea1f351595f6af6f35af7de12a5) | Synthetic purchase-request CSV; no app. |
| [empty-project](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/a7082de814534e97ec8dd8b206a2821232c8ed5e) | Empty project, no installed integrations or credentials. |
| [powerapps-approvals](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/da54b48c5e5e96211f49c968af8524501af7a386) | Unmodified Microsoft Power Apps approval-center export and connector definition. Source and license included. |
| [claude-purchase-approvals](https://github.com/saturday-robot/agent-evaluation-fixtures/tree/a5de0a94b960546e344d71c884b0ba5531c4ebb4) | Actual Claude-chat export. React purchase approvals; localStorage, no login/backend. |

## Provenance and checks

The general React/data fixtures were created with Codex. The Claude app was generated and exported from Claude chat. The Power Apps sample is an unmodified Microsoft export with its license. None of these is labeled as a Bolt, Lovable or Replit export.

All five React apps passed a local production build. The orders-login API was checked for unauthenticated rejection, both demo users editing records, and persisted updates. These fixtures are for isolated evaluation, not production use.

Retool-specific experience tests additionally use the official [bookstore sample](https://github.com/tryretool/bookstore_sample_app). That sample must be imported, seeded and published in a sandbox before live evaluations. CLI/MCP tests likewise require sandbox access.
