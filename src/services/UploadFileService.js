import http from '../http-common';

class UploadFileService{
    upload(file, onUploadProgress){
        const formData=new FormData();

        formData.append('file', file);

        return http.post('/files', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress
        });
    }

    getFiles(){
        return http.get('/files');
    }

    getFile(filename){
        return http.get(`/files/${filename}`)
    }
}

export default new UploadFileService();