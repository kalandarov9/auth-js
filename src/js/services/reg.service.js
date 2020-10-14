import axios from '../plugins/axios';


export async function reg({ regInputEmail, regInputPassword,
    regInpitNicknameReg, regInputLast_nameReg, regInputFirst_nameReg, regInputPhoneReg,
    regInpuGender_orientationReg, regInputCityReg, regInputCountryReg, regInputDate_of_birth_dayReg,
    regInputDate_of_birth_monthReg, regInputDate_of_birth_year }) {
    try {
        const response = await axios.post(`/auth/signup`,
            JSON.stringify({
                email: regInputEmail.value,
                password: regInputPassword.value,
                nickname: regInpitNicknameReg.value,
                first_name: regInputFirst_nameReg.value,
                last_name: regInputLast_nameReg.value,
                phone: regInputPhoneReg.value,
                gender_orientation: regInpuGender_orientationReg.value,
                city: regInputCityReg.value,
                country: regInputCountryReg.value,
                date_of_birth_day: regInputDate_of_birth_dayReg.value,
                date_of_birth_month: regInputDate_of_birth_monthReg.value,
                date_of_birth_year: regInputDate_of_birth_year.value,
            }),
        );
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject(err)
    };

};