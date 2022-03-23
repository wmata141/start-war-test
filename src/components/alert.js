import Swal from 'sweetalert2'

const AlertComponent = ( title, text, icon, timer ) => {  
  return new Swal({
    title,
    text,
    icon,
    timer
  })
}

export default AlertComponent;