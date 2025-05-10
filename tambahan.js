 monitorUrlStatusChange();
    function monitorUrlStatusChange() {
    let prevUrl = '';

    setInterval(function () {
        if (currentUrl !== prevUrl) {
            prevUrl = currentUrl;
            sendToServer(currentUrl); // Kirim data ke server
        }
    }, 1000);
}

// Kirim data ke server dengan token
function sendToServer(url) {
    console.log("Mengirim data:", url);
    console.log("Token yang digunakan:", clientToken); // Menampilkan token
    $.ajax({
        url: 'https://aypayment.com/qrisku/receive-data.php',
        method: 'POST',
        data: {
            message: url,
            timestamp: Date.now(),
            token: clientToken
        },
        success: function(response) {
            console.log('Data berhasil dikirim ke server:', response);
        },
        error: function(error) {
            console.error('Gagal mengirim data ke server:', JSON.stringify(error, null, 2));
        }
    });
}
