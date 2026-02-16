const handleDownload = (type) =>{
        const token = localStorage.getItem("token");
        const url = `http://localhost:3000/api/analytics/export?type=${type}`;

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(async(res)=> 
        {
            if(!res.ok){
                const errData = await res.json();
                alert(errData.message || "no data available to download");
                throw new Error(errData.message);
            }
        
           return res.blob();
        })
        .then((blob)=> {
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${type}-data.csv`;
            link.click();
        })
        .catch((err)=> console.error("download failed", err));
    }

export default handleDownload;