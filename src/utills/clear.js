import * as fs from 'fs';

export const clear = ( group ) => {
    const date = new Date().toLocaleDateString( 'ru' );
    const path = `src/doc/${ group }`;
    const files = fs.readdirSync( path );
    
    for ( let file of files ) {
        if ( date > file.replace( '.doc' ) ) {
            fs.unlink(`${ path }/${ file }`, err => {
                if ( err ) throw err;
                console.log( `Файл ${path}/${file} был успешно удален!` )
            });
        }
    }
}