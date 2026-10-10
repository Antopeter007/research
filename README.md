# Research — Physical Design Studio

A responsive VLSI Physical Design and electronics research workspace. The core interface is dependency-free; Python loads a pinned Pyodide runtime from its documented CDN.

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

## Engineering labs

- Python editor, .py import/download, input/output widths, stdin, output capture and eight recent run snapshots. Code must read OUTPUT_BITS, INPUT_BITS, FRACTION_BITS or INPUT_TEXT to respond to those controls; hardcoded scripts are not rewritten.
- Python runs in a terminable module worker using Pyodide 0.29.3. First load and optional packages need internet. Execution limits start after runtime/package loading. Output is capped at 64 KB. Native EDA executables and arbitrary desktop libraries are not supported.
- BigInt binary/hex/signed conversion up to 256 bits, bit toggling, width-limited arithmetic, fixed-point quantisation, and expected/actual vector comparison with CSV export.
- Electronics workbench with diagrams for a resistor divider, RC low/high-pass filters and a non-inverting amplifier. Ideal calculations, measured-value comparison, frequency-sweep table, Boolean gates and truth tables. Divider/RC SPICE netlists can be downloaded for ngspice; no SPICE engine is embedded.
- Clock-period and standard-cell core-area planning estimates, plus official EDA references.

These are scoped helpers, not arbitrary circuit-image recognition or full transistor-level/signoff simulation. Circuit input values, Python editor/settings/output and recent run snapshots are included in JSON backups. Merge preserves the active editor/settings and merges run history; replacement restores incoming settings.

## Saving and backups

The workspace is saved in localStorage using `physical-design-research-v1`. It is local to the current website origin, browser profile and device. Papers and notes are never committed to the public GitHub repository. There is no login, backend, cloud database or automatic cross-device sync.

Returning in the same browser shows the saved workspace. Browser-data clearing, private-mode session termination and storage eviction can remove it. Export a JSON backup regularly. To move to another device, export on the first device and restore on the second.

Restore supports replacement (after confirmation) and record merging. Merge retains the current notes and existing record versions; identical IDs or record identities are skipped. Backup reminders are shown when work exists and no export has been requested, or over seven days have passed since the last export request. Confirm each requested download was saved successfully.

The schema migrates earlier version-1 workspaces and backups, preserving papers, runs, tasks and notes. Malformed stored data is left untouched and a recovery download is provided. Browser write failures are visible; current in-memory work can still be exported. If another tab changes saved data, writes from a stale tab are paused until reload to avoid overwriting those changes.

## Hosting

GitHub Pages serves the main branch root. Open index.html locally for a basic preview, or use the deployed site for consistent browser-origin storage. No build step is required. Serve over HTTP(S) for the Python module worker; opening a file:// URL is not sufficient for Python.

## Limitations

This workspace organises research and runs browser-compatible Python and ideal circuit calculations. It does not run native EDA tools, analyse paper contents, synchronise devices, or verify signoff. Metrics must be entered from actual reports with the stated unit conventions. Timer completion is deadline-based and records finished focus sessions; unfinished sessions and breaks are excluded. Background alarm delivery is not guaranteed.

## Validation

JavaScript syntax, HTML ID references, version-1 migration, missing/zero metrics, context comparison, duplicate merge and backup validation were checked. A DOM mock exercised full initialization, navigation, comparison rendering, paper saves and milestone saves. Browser preview QA was unavailable in the managed environment; the live deployment is verified separately.

Additional validation: bit wrapping and 256-bit signed values, arithmetic shifts, vector mismatches, RC cutoff/DC behavior, op-amp clipping, logic gates, new backup-field round trips and execution of all five Python templates.
