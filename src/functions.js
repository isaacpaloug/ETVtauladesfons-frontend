import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alerta(missatge, icone, focus){
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:missatge,
        icon:icone
    })
}
function onfocus(focus) {
    if (focus !== '') {
        document.getElementById(focus).focus();
    }
}