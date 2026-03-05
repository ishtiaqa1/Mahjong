<?php
// Get current name of React-generated CSS file and store as URL
$url = "";
$ext = ".css";
$dir = "assets/";
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if (str_contains($file, $ext)) {
                $url = $file;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Page Not Found</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="assets/<?php echo $url; ?>">
    <script type="text/javascript">
    function isDark() {
        if (localStorage.getItem("dark-mode") === '🌙') {
            const elem = document.getElementById("main-body");
            elem.setAttribute("data-dark-mode", "true");
        }
    }
    window.onload = isDark;
    </script>
</head>

<body id="main-body" onload="isDark();" data-dark-mode="false">
    <div class="center-block">
        <div class="tile-header">
            <div class="Mahjongtile">
                <p>MAH JONG</p>
            </div>
            <h1>&nbsp;Page Not Found</h1>
        </div>
        <div class="flex-text">
            <p><b>Whoops!</b> Looks like this link has expired.</p>
        </div>
        <br/>
        
        <div class="back-home">
            <a href="https://se-dev.cse.buffalo.edu/CSE442/2025-Spring/cse-442ad/">
                <span class="back-button">&#8617;</span>Back to Homepage
            </a>
        </div>
        
    </div>
</body>
</html>