tinymce.init({
  selector: '#mytextarea',
  height: 500,
  menubar: false,
  plugins: [
    'lists links'
  ],
  
  toolbar: 'undo redo | ' +
    'bold italic | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' + 'codesample | ',
  content_style: 'body { font-family:"Poppins",sans-serif; font-size:14px }',
  statusbar: false,
  setup: function (editor) {
    editor.on('change', () => {
      editor.save();
    });
  }
});