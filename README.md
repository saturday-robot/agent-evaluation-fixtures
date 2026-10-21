# Agent evaluation projects

Each demo project now has its own repository. This repository is the index and retains the original branches and commits for historical Gauge runs.

| Project | Starting state |
| --- | --- |
| [Order tracker](https://github.com/saturday-robot/eval-order-tracker) | React order tracker; browser-local data on main. The with-login branch adds a Node API, demo login and JSON-file persistence. |
| [Dispatch board](https://github.com/saturday-robot/eval-dispatch-board) | Generic React dispatch prototype; local data, no login or backend. Created with Codex; not a Bolt export. |
| [Inventory prototype](https://github.com/saturday-robot/eval-inventory-local) | Generic React inventory prototype; local data, no Supabase connection. |
| [CSV inputs](https://github.com/saturday-robot/eval-csv-inputs) | Synthetic customer and order CSV files with data-quality issues. |
| [Approval spreadsheet](https://github.com/saturday-robot/eval-approval-spreadsheet) | Synthetic purchase-request CSV; no app or automation. |
| [Empty project](https://github.com/saturday-robot/eval-empty-project) | Empty starting project; no integrations or credentials. |
| [Power Apps approvals](https://github.com/saturday-robot/eval-powerapps-approvals) | Microsoft approval-center export, connector definition and original license. No live tenant. |
| [Claude purchase approvals](https://github.com/saturday-robot/eval-claude-purchase-approvals) | Claude-generated React purchase approvals; browser-local data, no login or backend. |
| [Bolt dispatch app](https://github.com/saturday-robot/eval-bolt-dispatch) | Native Bolt dispatch app export; browser-local jobs, no login or backend. |
| [Lovable purchase requests](https://github.com/saturday-robot/eval-lovable-purchase-requests) | Native Lovable purchase-request export; local demo mode and Supabase schema/seed. A live sandbox is separate. |
| [Replit inventory app](https://github.com/saturday-robot/eval-replit-inventory) | Native Replit inventory export. Main uses server memory; with-postgres contains the Postgres-backed state. |

## Making changes

Edit each project in its own repository. Use branches for different starting states of the same app. Gauge scenarios remain pinned to exact commits; after changing an app, update the relevant Gauge scenario to the intended commit. Existing runs keep their original snapshot.

The split preserves the original source commits and project files. Data is synthetic; a source repo does not provide live service credentials, a running database or a published Retool app.

The official [Retool bookstore sample](https://github.com/tryretool/bookstore_sample_app) and other external source repos remain separate.
