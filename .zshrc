HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000

alias ls='ls --color=always'
export LS_COLORS="$(vivid generate molokai)"

source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

eval "$(starship init zsh)"