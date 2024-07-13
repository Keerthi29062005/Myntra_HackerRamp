// scripts.js

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';

  if (pageId === 'vote') {
    fetchSubmissions();
  }
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const output = document.getElementById('imagePreview');
    output.src = reader.result;
    output.style.display = 'block';
  }
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('submissionForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const outfitName = document.getElementById('outfitName').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('imagePreview');

  if (!image.src || image.src === window.location.href) {
    alert('No file chosen. Please select an image file to submit.');
    return;
  }

  const formData = new FormData();
  formData.append('imageUpload', document.getElementById('imageUpload').files[0]);
  formData.append('outfitName', outfitName);
  formData.append('description', description);

  try {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      body: formData,
      headers: { 'Origin': 'http://localhost:5000' } // No need for specific Origin header
    });
    if (!response.ok) {
      throw new Error('Submission failed');
    }

    const data = await response.json();
    alert(data.message);

    const entry = document.createElement('div');
    entry.innerHTML = `
      <img src="${image.src}" alt="${outfitName}">
      <h3>${outfitName}</h3>
      <p>${description}</p>
      <button onclick="vote(this)">Vote</button>
      <button onclick="deleteEntry(this)">Delete</button>
    `;
    document.getElementById('entries').appendChild(entry);

    // Clear the form and image preview
    document.getElementById('submissionForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    showPage('vote');
  } catch (error) {
    console.error('Error submitting:', error);
    alert('Submission failed');
  }
});

async function fetchSubmissions() {
  try {
    const response = await fetch('http://localhost:5000/submissions');
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const submissions = await response.json();
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    submissions.forEach(submission => {
      const entry = document.createElement('div');
      entry.innerHTML = `
        <img src="${submission.image}" alt="${submission.outfitName}">
        <h3>${submission.outfitName}</h3>
        <p>${submission.description}</p>
        <button onclick="vote(this)">Vote</button>
        <button onclick="deleteEntry(this)">Delete</button>
      `;
      entriesDiv.appendChild(entry);
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    alert('Failed to fetch submissions');
  }
}

function vote(button) {
  alert('Thanks for voting!');
  button.disabled = true;
}

function deleteEntry(button) {
  if (confirm('Are you sure you want to delete this entry?')) {
    const entry = button.parentElement;
    entry.parentElement.removeChild(entry);
  }
}
