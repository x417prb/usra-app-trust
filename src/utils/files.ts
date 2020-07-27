export async function selectFiles(options: {
  accept?: string;
  multiple?: true;
}): Promise<FileList>;
export async function selectFiles(options: {
  accept?: string;
  multiple: false;
}): Promise<File>;
export async function selectFiles(options: {
  accept?: string;
  multiple?: boolean;
}) {
  const selectFiles: ReturnType<typeof createFileSelector> = (
    // @ts-ignore
    window.selectFiles || (window.selectFiles = createFileSelector())
  );
  const files = await selectFiles(options);
  if (options.multiple) {
    return files;
  } else {
    for (const file of Array.from(files)) {
      return file;
    }
  }
}

function createFileSelector() {
  const input = document.createElement("input");
  input.type = 'file';
  const form = document.createElement('form');
  form.appendChild(input);
  form.hidden = true;
  document.body.appendChild(form);
  return ({
    accept = '',
    multiple = true
  }: {
    accept?: string;
    multiple?: boolean;
  }) => {
    input.accept = accept;
    input.multiple = multiple;
    return new Promise<FileList>((resolve, reject) => {
      form.reset();
      input.click();
      input.onchange = () => {
        if (input.files == null)
          reject("No files selected");
        else
          resolve(input.files);
        input.onchange = null;
      };
    });
  };
}
