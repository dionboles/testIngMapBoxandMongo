
const storeForm = document.getElementById("store-form");
const storeid = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");


async function addStore(e){
    e.preventDefault();
    if(storeid.value === "" || storeAddress.value === ""){
        alert("Please fill out form ")
    }
    const sendBody = {
        storeId : storeid.value,
        address : storeAddress.value
    }

    try {
        const res = await fetch("/api/v1/stores",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(sendBody)
        });
        if(res.status === 400){
            throw Error("Store already existes")
        }

        alert("Store added!");
        window.location.href = "/index.html";
    } catch (error) {
        alert(error);
        return;
    }
}
storeForm.addEventListener("submit",addStore)