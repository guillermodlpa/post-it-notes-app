
function index(request, response/* , next*/) {
  response.render('index', {
    title: 'Post It Notes App v2',
  });
}

export default {
  index,
};
