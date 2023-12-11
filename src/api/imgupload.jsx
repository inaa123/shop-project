export async function upLoadImg(file){
    try{
        const formData = new FormData(); //가이드에 정해져있음.(문서 - guide - upload - )
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

        const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method : 'POST',
            body : formData
        });
        if(!res.ok){ // ok : (업로드 완료되면 ok) -> !res.ok : res로 업로드를 못했을 때
            console.error(res.status); 
        }
        const data = await res.json();
        return data.url;
    }catch(error){
        console.error(error);
    }
}