import { useNavigate } from "react-router";
import { notify } from "../../utils/utils";
import { useState } from "react";
import api from "../../services/api";

const MyAnnonceList = ({ annonce }) => {

  const navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);
  // console.log(annonce);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // les mois commencent à 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const initialValue = {
    idReceiver: annonce.utilisateur.id,
    contenu: '',
    datemessage: formatDate(new Date())
  };
  const [messagereq, setMessagereq] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.messagereq);
    try {
      const resp = await api.post('/messageries', messagereq);
      // window.location.reload();
      console.log(resp);
      setShowModal(false);
      notify("success", "Message envoyé", 100);

    } catch (error) {
      console.error('errorr', error);
    }
  };
  const getStatut = () => {
    switch (annonce.etat) {
      case -5:
        return 'refuse'
      case -10:
        return 'supprime'
      case 0:
        return 'En attente'
      case 5:
        return 'Valide'
      case 10:
        return 'Vendu'
      default:
        break;
    }
  }

  const getColor = () => {
    switch (annonce.etat) {
      case -5:
        return 'bg-red-800'
      case -10:
        return 'bg-red-500'
      case 0:
        return 'bg-yellow-500'
      case 5:
        return 'bg-green-500'
      case 10:
        return 'bg-green-800'
      default:
        break;
    }
  }
  return (
    <>
      <div
        className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
      >
        <div
          className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075] h-1/2 xs:h-full sm:h-1/2 xs:w-1/2 w-full sm:w-full"
          // className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075]  xs:w-1/2 w-full sm:w-full"
          onClick={() => {
            navigate(`/product/${annonce.id}`);
          }}
        >
          <img
            src={annonce.photo[0].link}
            alt=""
            className="w-full h-28"
          />
        </div>

        <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
          <div>
            <div className=" flex justify-between">
              <div className="flex flex-col">
                <span className="text-xm font-medium">{annonce.nomVoiture}</span>
                <span className="flex items-center gap-1">
                  <span className="text-xs text-gray-400 mb-2">{annonce.type.libelle}</span>
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-amber-600">AR {annonce.prix.toLocaleString()}</span>

              </div>
            </div>
            <p className="text-sm text-gray-600">{annonce.utilisateur.nom} {annonce.utilisateur.prenom}</p>
          </div>
          <div className="w-full pt-2 border-t flex justify-between items-center">

            <p className={`inline-block ${getColor()} text-white px-2 py-1 rounded-full text-xs font-semibold`}> {getStatut()} </p>
            <div>

            </div>



          </div>
        </div>
      </div >
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto relative mt-20">
            <h3 className="text-2xl font-semibold mb-4">{annonce.utilisateur.nom} {annonce.utilisateur.prenom}</h3>

            <form className="space-y-8" method="post" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Message</label>
                <input className="w-full p-2 border rounded" type="text" placeholder="Type a message here"
                  value={messagereq.contenu}
                  onChange={(e) =>
                    setMessagereq({
                      ...messagereq,
                      contenu: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  type="submit"
                // onClick={() => setShowModal(false)}
                >
                  Envoyer
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>

              </div>
            </form>
          </div>

        </div>
      )}
    </>
  );
};

export default MyAnnonceList;
