// Python executes in a module worker so calculations do not block the page.
// The pinned runtime is distributed by Pyodide's documented CDN.
const BASE = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
let runtime = null;
let busy = false;
let output = '';
let pendingOutput = '';
let outputTruncated = false;
const OUTPUT_LIMIT = 65536;
const send = (type, data = {}) => self.postMessage({ type, ...data });
function capture(text) {
  const line = String(text) + '\n';
  const available = OUTPUT_LIMIT - output.length;
  if (available <= 0) { outputTruncated = true; return; }
  const part = line.slice(0, available);
  output += part;
  pendingOutput += part;
  if (part.length !== line.length) outputTruncated = true;
  if (pendingOutput.length >= 2048) flushOutput();
}
function flushOutput() {
  if (pendingOutput) { send('output', { chunk: pendingOutput }); pendingOutput = ''; }
}
async function initialise() {
  if (runtime) return runtime;
  send('status', { message: 'Loading browser Python. The first run needs an internet connection…' });
  const { loadPyodide } = await import(BASE + 'pyodide.mjs');
  runtime = await loadPyodide({ indexURL: BASE });
  return runtime;
}
self.onmessage = async (event) => {
  if (event.data?.type !== 'run' || busy) return;
  busy = true;
  const data = event.data;
  output = ''; pendingOutput = ''; outputTruncated = false;
  let globals = null, dict = null, result = null;
  try {
    const py = await initialise();
    py.setStdout({ batched: capture });
    py.setStderr({ batched: capture });
    const lines = data.stdin ? String(data.stdin).replace(/\r\n/g, '\n').split('\n') : [];
    let inputIndex = 0;
    py.setStdin({ stdin: () => inputIndex < lines.length ? lines[inputIndex++] : null });
    if (data.packages) {
      send('status', { message: 'Loading supported imported packages…' });
      await py.loadPackagesFromImports(data.code, {
        messageCallback: message => send('status', { message }),
        errorCallback: capture,
      });
    }
    dict = py.globals.get('dict');
    globals = dict();
    globals.set('__name__', '__main__');
    globals.set('OUTPUT_BITS', data.outputBits);
    globals.set('INPUT_BITS', data.inputBits);
    globals.set('FRACTION_BITS', data.fractionBits);
    globals.set('INPUT_TEXT', data.inputText);
    send('executing', { runtimeVersion: py.version });
    const start = performance.now();
    result = await py.runPythonAsync(data.code, { globals, filename: 'research_script.py' });
    if (result !== undefined && result !== null) capture(String(result));
    flushOutput();
    send('done', { output, truncated: outputTruncated, elapsed: performance.now() - start, runtimeVersion: py.version });
  } catch (error) {
    flushOutput();
    send('failed', { output, truncated: outputTruncated, error: String(error?.message || error).slice(0, 12000) });
  } finally {
    result?.destroy?.();
    globals?.destroy?.();
    dict?.destroy?.();
    busy = false;
  }
};
