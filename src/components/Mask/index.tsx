export function cpfMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    value = value.replace(/(-\d{2})\d+?$/, '$1');
    
    e.currentTarget.value = value;
    return e;
};

export function dateMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 10;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1');

    e.currentTarget.value = value;
    return e;
}

export function yearMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 4;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '');

    e.currentTarget.value = value;
    return e;
}

export function registerMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 6;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '');

    e.currentTarget.value = value;
    return e;
}

export function emailMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 22;
    let value = e.currentTarget.value;

    value = value.replace(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, value);

    e.currentTarget.value = value;
    return e;
}
