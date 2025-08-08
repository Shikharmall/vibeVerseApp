const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

const isValidWebsite = (website: string): boolean => {
    const pattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\:[0-9]{1,5})?(\/.*)?$/;
    return pattern.test(website);
};

export { isValidEmail, isValidPhone, isValidWebsite };