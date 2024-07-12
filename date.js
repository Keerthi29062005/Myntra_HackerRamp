document.addEventListener("DOMContentLoaded", function() {
    const sundayComponent = document.getElementById("disappear");
    
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, and so on
    // console.log(dayOfWeek);
    if (dayOfWeek === 5) { // 0 corresponds to Sunday
        sundayComponent.style.display = "block";
    } else {
        sundayComponent.style.display = "none";
    }
});
