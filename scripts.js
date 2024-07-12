// scripts.js

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
  }
  
  function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
      const output = document.getElementById('imagePreview');
      output.src = reader.result;
      output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  
  document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const outfitName = document.getElementById('outfitName').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('imagePreview');
  
    if(!imagePreview.src || imagePreview.src === window.location.href){
      alert('No file chosen.Please select an image file to submit. ')
      return;
    }

    const entry = document.createElement('div');
    entry.innerHTML = `
      <img src="${image}" alt="${outfitName}">
      <h3>${outfitName}</h3>
      <p>${description}</p>
      <button onclick="vote(this)">Vote</button>
      <button onclick="deleteEntry(this)">Delete</button>
    `;
    document.getElementById('entries').appendChild(entry);
  
    // Clear the form
    document.getElementById('submissionForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    showPage('vote');
  });
  
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
