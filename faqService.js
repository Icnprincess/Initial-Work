import axios from 'axios';
import * as helper from './serviceHelpers';
import { onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/faqs`;

const getFaq = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess);
};

const addFaq = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

const deleteFaq = (id) => {
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id} `,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(() => {
        return id;
    });
};

const updateFaq = (payload) => {
    const config = {
        method: 'PUT',
        url: `${endpoint}/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess);
};

const search = (pageIndex, pageSize, query) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess);
};

export { getFaq, addFaq, deleteFaq, updateFaq, search };
