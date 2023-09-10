import watch from "node-watch";


watch('./src', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
});