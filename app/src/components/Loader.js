import React from 'react'

export default function Loader() {
    return (
        <div className='loading-container'>
            <div id="container-load">
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow-load">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                                flood-color="#fc6767" />
                        </filter>
                    </defs>
                    <circle id="spinner-load" style={{
                        fill: 'transparent',
                        stroke: '#e50914',
                        strokeWidth: '7px', strokeLinecap: 'round',
                        filter: 'url(#shadow)'
                    }} cx="50" cy="50" r="45" />
                </svg>
            </div>
        </div>
    )
}
