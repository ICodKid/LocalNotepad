
const notepad = document.getElementById('notepad');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const downloadButton = document.getElementById('download');
const uploadInput = document.getElementById('upload');
const findInput = document.getElementById('find-input');
const replaceInput = document.getElementById('replace-input');
const findButton = document.getElementById('find');
const replaceButton = document.getElementById('replace');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');

// Load saved content
window.onload = () => {
  const savedText = localStorage.getItem('notepadContent');
  if (savedText) {
    notepad.value = savedText;
  }
  updateCounter();
};

// Save content to localStorage
saveButton.addEventListener('click', () => {
  localStorage.setItem('notepadContent', notepad.value);
  alert('Content saved!');
});

// Clear content
clearButton.addEventListener('click', () => {
  notepad.value = '';
  localStorage.removeItem('notepadContent');
  alert('Content cleared!');
  updateCounter();
});

// Download content as a .txt file
downloadButton.addEventListener('click', () => {
  const blob = new Blob([notepad.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'notes.txt';
  link.click();
});

// Load content from a .txt file
uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      notepad.value = e.target.result;
      updateCounter();
    };
    reader.readAsText(file);
  }
});

// Update word and character count
notepad.addEventListener('input', updateCounter);

function updateCounter() {
  const text = notepad.value;
  wordCount.textContent = `Words: ${text.split(/\s+/).filter((word) => word).length}`;
  charCount.textContent = `Characters: ${text.length}`;
}

// Find and Replace
findButton.addEventListener('click', () => {
  const searchTerm = findInput.value;
  const content = notepad.value;
  if (searchTerm) {
    const index = content.indexOf(searchTerm);
    if (index !== -1) {
      notepad.setSelectionRange(index, index + searchTerm.length);
      notepad.focus();
    } else {
      alert('Text not found.');
    }
  }
});

replaceButton.addEventListener('click', () => {
  const searchTerm = findInput.value;
  const replaceTerm = replaceInput.value;
  notepad.value = notepad.value.replaceAll(searchTerm, replaceTerm);
  updateCounter();
});
