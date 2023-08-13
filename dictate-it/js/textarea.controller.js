// placeholder
const ele = document.getElementById('editMe');

// Get the placeholder attribute
const placeholder = ele.getAttribute('data-placeholder');

// Set the placeholder as initial content if it's empty
ele.innerHTML === '' && (ele.innerHTML = placeholder);

ele.addEventListener('focus', function (e)
{
    const value = e.target.innerHTML;
    value === placeholder && (e.target.innerHTML = '');
});

ele.addEventListener('blur', function (e)
{
    const value = e.target.innerHTML;
    value === '' && (e.target.innerHTML = placeholder);
});