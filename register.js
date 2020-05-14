var db = firebase.firestore()

var formRegister = document.getElementById('form-register')
var progressUpload = document.getElementById('progress-upload')
var uploader = document.getElementById('uploader')
var fileDocument = document.getElementById('document')
var registerButton = document.getElementById('register_submit')
var messageProgress = document.getElementById('message_progress')

function showError(message) {
  Toastify({
    text: message,
    backgroundColor: 'linear-gradient(to right, #c0392b, #e74c3c)',
    className: 'info',
  }).showToast()
}

function handleRegister() {
  var name = document.getElementById('name')
  var email = document.getElementById('email')
  var file = fileDocument.files[0]

  if (name.value.length < 1 || email.value.length < 1) {
    showError('Por favor, preencha todos os campos!')
  } else if (!file) {
    showError('O envio do comprovante é obrigatório!')
  } else {
    formRegister.classList.add('div-hide')
    progressUpload.classList.add('div-show')

    console.log(file)

    var fileName = +new Date() + '-' + email.value

    var storageRef = firebase.storage().ref()
    var task = storageRef.child(fileName).put(file)
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploader.value = percentage

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running')
            break
        }
      },
      function (err) {
        console.log(err)
        switch (err.code) {
          case 'storage/unauthorized':
            console.log('Upload unauthorized')
            showError('Upload do arquivo não autorizado!')
            break
          case 'storage/canceled':
            console.log('Upload canceled')
            showError('Upload do arquivo cancelado!')
            break
          case 'storage/unknown':
            console.log('Error server')
            showError('Algo deu errado ao fazer o upload do arquivo!')
            break
        }
      },
      function () {
        messageProgress.innerHTML = 'Upload completo!'
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File: ', downloadURL)
          uploader.classList.add('div-hide')
          messageProgress.innerHTML = 'Salvando dados...'
          db.collection('alunos')
            .add({
              name: name.value,
              email: email.value,
              voucher: downloadURL,
            })
            .then(function (docRef) {
              name.value = ''
              email.value = ''
              messageProgress.innerHTML =
                'Tudo certo!<br /> Bem Vindo ao Workshop Mobile!'
            })
            .catch(function (error) {
              console.log(error)
              showError(
                'Não foi possivel realizar seu cadastro, tente novamente!',
              )
            })
        })
      },
    )
  }
}
