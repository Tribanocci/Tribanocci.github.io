<?php
// Define your project URLs
$projectUrls = [
    "project1" => "https://www.example.com/project1",
    "project2" => "https://www.example.com/project2",
    // Add more projects as needed
];

// Get the project key from the query string
$projectKey = $_GET['project'];

// Check if the project key exists in the array
if (isset($projectUrls[$projectKey])) {
    // Redirect to the project URL
    header("Location: " . $projectUrls[$projectKey]);
    exit;
} else {
    // Handle invalid project key
    echo "Invalid project.";
}
?>
