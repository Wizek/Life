load('application');

before(loadNeed, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New need';
    this.need = new Need;
    render();
});

action(function create() {
    Need.create(req.body.Need, function (err, need) {
        if (err) {
            flash('error', 'Need can not be created');
            render('new', {
                need: need,
                title: 'New need'
            });
        } else {
            flash('info', 'Need created');
            redirect(path_to.needs());
        }
    });
});

action(function index() {
    this.title = 'Needs index';
    Need.all(function (err, needs) {
        render({
            needs: needs
        });
    });
});

action(function show() {
    this.title = 'Need show';
    render();
});

action(function edit() {
    this.title = 'Need edit';
    render();
});

action(function update() {
    this.need.updateAttributes(body.Need, function (err) {
        if (!err) {
            flash('info', 'Need updated');
            redirect(path_to.need(this.need));
        } else {
            flash('error', 'Need can not be updated');
            this.title = 'Edit need details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.need.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy need');
        } else {
            flash('info', 'Need successfully removed');
        }
        send("'" + path_to.needs() + "'");
    });
});

function loadNeed() {
    Need.find(params.id, function (err, need) {
        if (err || !need) {
            redirect(path_to.needs());
        } else {
            this.need = need;
            next();
        }
    }.bind(this));
}
