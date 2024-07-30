import Api from '@/services/Api'

export default{
    saveResume (request) {
        return Api().post('/saveResume', request)
    },
    getResumes (userID){
        return Api().get('/resumes/' + userID)
    },
    saveResumeVersion (request){
        return Api().put('/saveResumeVersion', request)
    },
    deleteResumeVersion (id){
        return Api().delete('/resume/' + id)
    }
}

