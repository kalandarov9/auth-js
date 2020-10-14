import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import 'bootstrap';


import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError, checkCountError } from './views/forms';
import { login } from './services/auth.service';
import { reg } from './services/reg.service';
import { notify } from './views/notifications';
import { autocomplete } from './views/autocomplete';
import { getContryList } from './services/contry';
import { getCityList } from './services/city';
import { getNews } from './services/news.service'


const { form, inputEmail, inputPassword, regForm, regInputEmail, regInputPassword,
    regInpitNicknameReg, regInputLast_nameReg, regInputPhoneReg, regInputFirst_nameReg,
    regInpuGender_orientationReg, regInputCityReg, regInputCountryReg, regInputDate_of_birth_dayReg,
    regInputDate_of_birth_monthReg, regInputDate_of_birth_year } = UI;
const inputsLogin = [inputEmail, inputPassword];
const inputsReg = [regInputEmail, regInputPassword,
    regInpitNicknameReg, regInputLast_nameReg, regInputPhoneReg, regInputFirst_nameReg,
    regInpuGender_orientationReg, regInputCityReg, regInputCountryReg, regInputDate_of_birth_dayReg,
    regInputDate_of_birth_monthReg, regInputDate_of_birth_year];
const data = {
    regInputEmail, regInputPassword,
    regInpitNicknameReg, regInputFirst_nameReg, regInputLast_nameReg, regInputPhoneReg,
    regInpuGender_orientationReg, regInputCityReg, regInputCountryReg, regInputDate_of_birth_dayReg,
    regInputDate_of_birth_monthReg, regInputDate_of_birth_year
}


//Events
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(form);
})

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(document.forms['regForm']);
})

inputsLogin.forEach(el => el.addEventListener('focus', () => {
    removeInputError(el);
}));

inputsReg.forEach(el => el.addEventListener('focus', () => {
    removeInputError(el);
}))

//Handlers
async function onSubmit(nameForms) {
    if (nameForms == form) {
        var inputs = inputsLogin;
    } else {
        var inputs = inputsReg;
    }
    //console.log(nameForms.elements[0].value);
    const isValidForm = inputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    if (nameForms == form) {
        try {
            await login(inputEmail.value, inputPassword.value);
            await getNews();
            form.reset();
            regForm.reset();
            notify({ msg: "Login success", className: "alert-success", timeout: 2000 })
        }
        catch (err) {
            form.reset();
            regForm.reset();
            notify({ msg: "Login faild", className: "alert-danger", timeout: 2000 })
        }

    }

    if (nameForms == regForm) {
        try {
            const respose = await reg(data);
            form.reset();
            if (respose.error === true) {
                notify({ msg: `${respose.message}`, className: "alert-danger", timeout: 2000 })
            } else {
                notify({ msg: `${respose.message}`, className: "alert-success", timeout: 2000 });
                regForm.reset();
            }
        }
        catch (err) {
            form.reset();
            notify({ msg: "Login User already exists", className: "alert-danger", timeout: 2000 })
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const countries = [];
    async function getNameListContry() {
        try {
            const response = await getContryList();
            Object.keys(response).forEach(function (key) {
                countries.push(this[key]);
            }, response);
            return countries;
        }
        catch (err) {
            console.log(err);
        }
    }
    getNameListContry();
    autocomplete(document.getElementById("countryReg"), countries);
});


regInputCityReg.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.getElementById("countryReg").value) {
        getContryList()
            .then((result) => {
                for (const key in result) {
                    if (result[key] === regInputCountryReg.value) {
                        return key;
                    }
                }
            }).then(async (id) => {
                autocomplete(document.getElementById("cityReg"), await getCityList(id));
            })
            .catch((err) => {
                console.log(err);
            })
    }
});



