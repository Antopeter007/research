# Research — Physical Design Studio

A responsive, dependency-free VLSI Physical Design research workspace.

## Workspace

- Overview with live counts, reading queue, upcoming milestones, recent experiments and a daily focus.
- Literature library with editable publication metadata, objective, method, findings, gap and relevance. Search/filter, review-matrix CSV export and BibTeX export are included. Citations use manually entered metadata; verify publication type, venue and authors before use.
- Editable experiment log with design revision, library, tool, implementation stage, corner, analysis mode, constraints and observations. Metrics: WNS/TNS in ns, cell area in µm², power in mW, DRC count and wirelength in µm.
- Baseline/candidate comparison with absolute WNS change and area/power percentage change. Missing metrics remain missing. Zero baselines do not produce percentages. Incomplete or differing context is highlighted; matching labels do not prove experimental equivalence.
- Autosaved notebook with research question, working hypothesis and a five-part thesis outline.
- Milestone board with status, priority, due date and category.
- Focus timer, completed-session history and downloadable weekly review.
- Official OpenROAD/OpenSTA resources, research searches and DOI links.
- Daily motivational message from 31 original messages, selected by the visitor's local calendar date. It updates while the page remains open.

## Saving and backups

The workspace is saved in localStorage using `physical-design-research-v1`. It is local to the current website origin, browser profile and device. Papers and notes are never committed to the public GitHub repository. There is no login, backend, cloud database or automatic cross-device sync.

Returning in the same browser shows the saved workspace. Browser-data clearing, private-mode session termination and storage eviction can remove it. Export a JSON backup regularly. To move to another device, export on the first device and restore on the second.

Restore supports replacement (after confirmation) and record merging. Merge retains the current notes and existing record versions; identical IDs or record identities are skipped. Backup reminders are shown when work exists and no export has been requested, or over seven days have passed since the last export request. Confirm each requested download was saved successfully.

The schema migrates earlier version-1 workspaces and backups, preserving papers, runs, tasks and notes. Malformed stored data is left untouched and a recovery download is provided. Browser write failures are visible; current in-memory work can still be exported. If another tab changes saved data, writes from a stale tab are paused until reload to avoid overwriting those changes.

## Hosting

GitHub Pages serves the main branch root. Open index.html locally for a basic preview, or use the deployed site for consistent browser-origin storage. No dependencies or build step are required.

## Limitations

This workspace organises research. It does not run EDA tools, analyse paper contents, synchronise devices, or verify signoff. Metrics must be entered from actual reports with the stated unit conventions. Timer completion is deadline-based and records finished focus sessions; unfinished sessions and breaks are excluded. Background alarm delivery is not guaranteed.

## Validation

JavaScript syntax, HTML ID references, version-1 migration, missing/zero metrics, context comparison, duplicate merge and backup validation were checked. A DOM mock exercised full initialization, navigation, comparison rendering, paper saves and milestone saves. Browser preview QA was unavailable in the managed environment; the live deployment is verified separately.
