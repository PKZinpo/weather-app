import React from 'react';
import { Helmet } from 'react-helmet';

export default function PageTitle() {
    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>Weather App</title>
            <link rel='canonical' href='https://pkzinpo.github.io/weather-app/' />
            <meta name='description' content='Weather application for US' />
        </Helmet>
    );
}