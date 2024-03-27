%resume

Java.perform(function() {
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            console.log(className);
        },
        onComplete: function() {}
    });
});

File = Java.use('java.io.File');
FileInputStream = Java.use('java.io.FileInputStream');
SuperpackFileInputStream = Java.use("com.facebook.superpack.SuperpackFileInputStream")
SuperpackArchive = Java.use("com.facebook.superpack.SuperpackArchive")
FileOutputStreamClass = Java.use('java.io.FileOutputStream');
ByteArrayOutputStreamClass = Java.use('java.io.ByteArrayOutputStream');

// Create a filestream for the compressed file
file = File.$new('/data/local/tmp/Ig4aBundle.js.hbc.spk.xz');
fileInputStream = FileInputStream.$new(file);

some_archive = SuperpackArchive.$new(SuperpackArchive.readNative(fileInputStream,"xz",0),null)

// Check if there is a superpack in the archive

// Get the Superpack
the_next = some_archive.next()

// setup the superpackFileStream
some_sp = SuperpackFileInputStream.$new(the_next)

buffer = Java.array('byte', Array(1024).fill(0));

//some_sp.read() need the length of the file

// save it to the buffer, some_sp.read() is the length

the_length = some_sp.read()

// Probably a better way to do this but 
// if we read from_sp we obviously seek through the file
// so let's put back some_sp

some_sp = SuperpackFileInputStream.$new(the_next)

some_sp.read(buffer,0, the_length)

// write the buffer to the output stream
byteArrayOutputStream = ByteArrayOutputStreamClass.$new();
byteArrayOutputStream.write(buffer, 0, the_length);


// Setup the file path

outputFile = File.$new("/storage/emulated/0/Android/data/com.instagram.android/files/ig.js.hbc");

// Setup byte array for file
byteArray = byteArrayOutputStream.toByteArray();

// Save the file
fileOutputStream = FileOutputStreamClass.$new(outputFile.getAbsolutePath());
fileOutputStream.write(byteArray);
fileOutputStream.flush();
fileOutputStream.close();
